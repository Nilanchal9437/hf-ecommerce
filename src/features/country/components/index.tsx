"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons from react-icons
import StatusMode from "@/components/StatusMode";
import Table from "@/components/Table/components";
import Pagination from "@/components/Pagination/components";
import Search from "@/components/Search/components";
import Title from "@/components/Title";

import type { CountryType } from "@/features/country/types";
import type { PaginationProps } from "@/types";

import getList from "@/features/country/apis/getList";

function Country() {
  const [load, setLoad] = React.useState<boolean>(true);
  const [store, setStore] = React.useState<{
    store: CountryType[];
    total: number;
  }>({
    store: [],
    total: 0,
  });
  const [pagination, setPagination] = React.useState<PaginationProps>({
    limit: 10,
    pageNo: 1,
    searchKeyword: "",
  });

  const getCountryList: () => void = async (): Promise<void> => {
    setLoad(true);

    const { status, data, total } = await getList({
      ...pagination,
    });

    if (status) {
      setStore({ store: data, total: total });
    } else {
      setStore({ store: [], total: 0 });
    }
    setLoad(false);
  };

  React.useEffect(() => {
    getCountryList();
  }, [pagination.limit, pagination.pageNo]);

  const router = useRouter();

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "code",
      headerName: "CODE",
      flex: 1,
      width: 300,
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      width: 300,
      renderCell: (params: any) => <StatusMode active={params.row.status} />,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 0.7,
      renderCell: (params: any) => (
        <>
          <Link href={`/country/edit?id=${params.row._id}`}>
            <button className="text-blue-500 p-2 transition cursor-pointer">
              <FaEdit size={20} />
            </button>
          </Link>
          <Link href={`/country/delete?id=${params.row._id}`}>
            <button className="text-red-500 p-2 transition cursor-pointer">
              <FaTrashAlt size={20} />
            </button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <Title
        title="Country"
        description="The country is used for helping the companies to register in our portal"
        btntitle="Add"
        action={() => {
          router.push("/country/add");
        }}
      />
      <div className="w-full my-5">
        <Search
          CallBack={() => getCountryList()}
          searchBy={"Country"}
          searchKeyword={pagination.searchKeyword}
          setSearchKeyword={(event) =>
            setPagination({ ...pagination, searchKeyword: event })
          }
          setPagination={(event) =>
            setPagination({ ...pagination, pageNo: event })
          }
        />
      </div>
      <div className="w-full">
        <Table
          columns={columns}
          rows={store.store}
          selected={[]}
          setSelected={(event) => {}}
          load={load}
        />
      </div>
      <div className="bg-gray-200 p-4">
        <div className="w-full">
          <Pagination
            total={store.total}
            setLimit={(event) => setPagination({ ...pagination, limit: event })}
            setPagination={(event) =>
              setPagination({ ...pagination, pageNo: event })
            }
            limit={pagination.limit}
            start={pagination.pageNo}
          />
        </div>
      </div>
    </>
  );
}

export default Country;
