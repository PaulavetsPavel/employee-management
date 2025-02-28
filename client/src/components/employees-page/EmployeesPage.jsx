import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../index";
import EmployeeService from "../../services/EmployeeService.js";
import EmployeeItem from "./EmployeeItem.jsx";
import styles from "./Employees.module.css";
import "../../assets/style/table.css";
import "../../assets/style/global.css";

const EmployeePage = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const getEmployees = async (page, limit) => {
    try {
      const response = await EmployeeService.fetchEmployees(page, LIMIT);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees", page],
    queryFn: () => getEmployees(page, LIMIT),
  });

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (id) => {
      EmployeeService.deleteEmployee(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees", page],
        // exact,
        refetchType: "all",
      });
    },
  });

  const deleteEmployee = async (id) => {
    mutateAsync(id);
  };

  if (!store.isAuth) navigate("/login");
  if (isLoading) return <div>Loading ...</div>;
  if (error) console.log(error.message);

  return (
    <div className="container">
      <header className={styles.header}>
        <h2 className={styles.header__title}>
          Пользователь: {store.user.email}
        </h2>
        <button
          onClick={() => {
            store.logout();
            navigate("/login");
          }}
        >
          Выйти
        </button>
      </header>

      <main>
        {store.user.role === "admin" && (
          <div className="main__buttons">
            <button
              onClick={() => {
                navigate("/logs");
              }}
            >
              Логи
            </button>
            <button
              onClick={() => {
                navigate("/employees/add");
              }}
            >
              Создать нового сотрудника
            </button>
          </div>
        )}
        <h2 className="table__title">Список сотрудников</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Позиция</th>
              <th>Зарплата</th>
              <th>Дата приема</th>
              <th>Фото</th>
              <th>Редактирование</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((employee) => (
                <tr key={employee.id}>
                  <EmployeeItem
                    employee={employee}
                    deleteEmployee={deleteEmployee}
                  />
                </tr>
              ))
            ) : (
              <>Нет данный о сотрудниках</>
            )}
          </tbody>
        </table>
        <div className={styles.pagination__container}>
          <div className="pagination__buttons">
            <button
              onClick={() =>
                setPage((prevPage) => {
                  return prevPage - 1;
                })
              }
              disabled={page == 1}
            >
              Пред
            </button>
            <button
              onClick={() =>
                setPage((prevPage) => {
                  return prevPage + 1;
                })
              }
              disabled={data.length < 10}
            >
              След
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeePage;
