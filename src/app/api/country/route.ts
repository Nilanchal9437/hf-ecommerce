import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/libs/db";
import * as yup from "yup";
import Country from "@/models/Country";
import { PipelineStage } from "mongoose";

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const size = await Country.find({ name: body?.name });

    if (size.length) {
      return NextResponse.json(
        {
          status: false,
          message: "This country already exsist!",
          data: size,
        },
        { status: 303 }
      );
    } else {
      const res = await Country.create({
        name: body?.name,
        code: body?.code,
        status: body?.status,
      });

      if (res) {
        return NextResponse.json(
          {
            status: true,
            message: "country created successfully",
            data: res,
          },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          {
            status: false,
            message: "something went wrong in creating country",
            data: res,
          },
          { status: 400 }
        );
      }
    }
  } catch (err: any) {
    console.error("Error in generating country :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong in generating country",
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const limit: any = req.nextUrl.searchParams.get("limit");
    const pageNo: any = req.nextUrl.searchParams.get("pageNo");
    const search: any = req.nextUrl.searchParams.get("search");
    const pipeline: PipelineStage[] = [];
    const startingAfter: number = (parseInt(pageNo) - 1) * parseInt(limit);

    console.log(startingAfter);

    if (search?.trim() !== "") {
      pipeline.push({
        $facet: {
          result: [
            {
              $match: {
                $or: [
                  { name: { $regex: search, $options: "i" } },
                  { code: { $regex: search, $options: "i" } },
                ],
              },
            },
            { $skip: startingAfter },
            { $limit: parseInt(limit) },
          ],
          total: [{ $count: "total" }],
        },
      });
    } else {
      pipeline.push({
        $facet: {
          result: [
            { $sort: { _id: -1 } },
            { $skip: startingAfter },
            { $limit: parseInt(limit) },
          ],
          total: [{ $count: "total" }],
        },
      });
    }

    const res = await Country.aggregate(pipeline);

    if (res && Array.isArray(res) && res.length > 0) {
      const response = res[0]?.result;
      const total = res[0]?.total[0]?.total;

      return NextResponse.json(
        {
          status: true,
          message: "country fetched successfully",
          data: response,
          total: total,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "something went wrong fetching country",
          data: [],
          total: 0,
        },
        { status: 303 }
      );
    }
  } catch (err: any) {
    console.error("Error in getting country :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong getting country",
        data: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const entrie = await req.json();

    const schema = yup.object().shape({
      _id: yup.string().trim().required("country id is missing!"),
    });

    return schema
      .validate({ ...entrie })
      .then(async (value) => {
        const res = await Country?.findOne({ _id: `${value._id}` });

        if (res?._id) {
          return NextResponse.json(
            {
              status: true,
              message: "country detail's fetched successfully",
              data: res,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              status: false,
              message: "something went wrong fetching country detail's",
              data: res,
            },
            { status: 303 }
          );
        }
      })
      .catch((err) => {
        if (err.errors != null && err.errors.length > 0) {
          return NextResponse.json(
            {
              status: false,
              message: "something went error occour country detail's",
              data: err.errors[0],
            },
            { status: 500 }
          );
        } else {
          return NextResponse.json(
            {
              status: false,
              message: "An error occurred while fetching the country details.",
              data: err.message,
            },
            { status: 500 }
          );
        }
      });
  } catch (err: any) {
    console.error("Error in getting country details :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong while retrieving the country details.",
        data: err.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const size = await Country.find({ name: body?.name });

    if (size.length > 0) {
      return NextResponse.json(
        {
          status: false,
          message: "This country name already exsist!",
          data: null,
        },
        { status: 303 }
      );
    } else {
      const res = await Country.updateOne(
        { _id: `${body?._id}` },
        { $set: { name: body?.name, code: body?.code } }
      );

      if (res.acknowledged) {
        return NextResponse.json(
          {
            status: true,
            message: "country updated successfully",
            data: res,
          },
          { status: 202 }
        );
      } else {
        return NextResponse.json(
          {
            status: false,
            message: "country not updated",
            data: res,
          },
          { status: 303 }
        );
      }
    }
  } catch (err: any) {
    console.error("Error in updating country :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong updating country",
        data: err,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const entrie = req.nextUrl.searchParams.get("_id");

    const schema = yup.object().shape({
      _id: yup.string().trim().required("country id is missing!"),
    });

    return schema
      .validate({ _id: entrie })
      .then(async () => {
        const res = await Country.deleteOne({ _id: `${entrie}` });

        if (res?.acknowledged) {
          return NextResponse.json(
            {
              status: true,
              message: "country deleted successfully",
              data: res,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              status: false,
              message: "something went wrong country",
              data: res,
            },
            { status: 400 }
          );
        }
      })
      .catch((err) => {
        if (err.errors != null && err.errors.length > 0) {
          return NextResponse.json(
            {
              status: false,
              message: "something went error occour country",
              data: err.errors[0],
            },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            {
              status: false,
              message: "something went error occour",
              data: err.message,
            },
            { status: 400 }
          );
        }
      });
  } catch (err: any) {
    console.error("Error in deleted country :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong deleted country",
        data: err.message,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  try {
    await dbConnect();

    const res = await Country.find({});

    if (res && Array.isArray(res) && res.length > 0) {
      const response = res;

      return NextResponse.json(
        {
          status: true,
          message: "country fetched successfully",
          data: response,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "No country found!",
          data: [],
        },
        { status: 404 }
      );
    }
  } catch (err: any) {
    console.error("Error in getting country :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong getting country",
        data: [],
      },
      { status: 500 }
    );
  }
}
