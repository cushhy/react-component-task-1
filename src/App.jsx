import { use, useState } from "react";
import "./App.css";
import styles from "./App.module.css"; // Import the CSS Module

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const [isValueValid, setIsValueValid] = useState(false);

  const onInputButtonClick = () => {
    let promptValue = prompt();

    if (promptValue.length < 3) {
      setError("ОШИБКА! Слово должно состоять не менее чем из трех символов!");
      setIsValueValid(false);
    } else {
      setValue(promptValue);
      setError("");
      setIsValueValid(true);
    }
  };

  const onAddButtonClick = () => {
    const updatedList = [
      ...list,
      { id: Date.now(), value, date: itemAddDate(new Date()) },
    ];
    if (isValueValid) {
      setList(updatedList);
      setValue("");
      setError("");
      setIsValueValid(false);
    }
  };

  const itemAddDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const time = date.toISOString().substring(11, 19);

    const fullDate = `${day}.${month}.${year} ${time}`;
    return fullDate;
  };

  return (
    <>
      <div className={styles.app}>
        <h1 className={styles["page-heading"]}>Ввод значения</h1>
        <p className={styles["no-margin-text"]}>
          Текущее значение <code>value</code>: "
          <output className={styles["current-value"]}>{value}</output>"
        </p>
        {error !== "" ? <div className={styles.error}>{error}</div> : ""}
        <div className={styles["buttons-container"]}>
          <button className={styles.button} onClick={onInputButtonClick}>
            Ввести новое
          </button>
          <button
            className={styles.button}
            disabled={!isValueValid}
            onClick={onAddButtonClick}
          >
            Добавить в список
          </button>
        </div>
        <div className={styles["list-container"]}>
          <h2 className={styles["list-heading"]}>Список:</h2>

          {list.length > 0 ? (
            <ul className={styles.list}>
              {list.map((item) => {
                return (
                  <li key={item.id} className={styles["list-item"]}>
                    {item.value}{" "}
                    <b>
                      <i>{item.date}</i>
                    </b>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles["no-margin-text"]}>
              Нет добавленных элементов
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
