import Swal from "sweetalert2";

const UseDelete = async ({ api, id, refetch, axiosSecure }) => {
  // const axiosSecure = useAxiosSecure();
  const res = await axiosSecure.delete(`/handleDelete?api=${api}&id=${id}`);
  const deletedCount = res.data?.deletedCount;
  if (deletedCount > 0) {
    refetch();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export default UseDelete;
