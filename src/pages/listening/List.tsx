import { useEffect, useState } from "react";
import styles from "./_.module.scss";

type data = {
  firstLanguage: string;
  secondLanguage: string;
}

// const range = [
//   [],
//   [],
//   [],
//   [],
//   ['A30:H42','A43:H51','A52:H58','A59:H68','A69:H85','A86:H96','A97:H109','A110:H121','A122:H131','A132:H138'],
//   ['A140:H149','A150:A157','A158:A166','A167:A177','A178:A186','A187:A208','A209:A215','A216:A224','A225:A234',''], // age group 5 ko co theme so 10: feelings
//   ['A236:A241','A242:A248','A249:A255','A256:A263','A264:A272','A273:A282','A283:A292','A293:A300','A301:A315','A316:A332'],
//   ['','','','','','','','',''],
//   ['','','','','','','','',''],
//   ['','','','','','','','',''],
//   ['','','','','','','','',''],
//   ['','','','','','','','',''],
//   ['','','','','','','','',''],
// ]


const ListElement = ({data}: {data: data}) => {
  return (
    <div id={styles.column} className={styles.borderBottom}>
      <span>{data.firstLanguage}</span>  
      <span>{data.secondLanguage}</span>
    </div>
  )
}

const List = () => {
  const [data, setData] = useState<any[]>([[],[],[],[],[],[],[]]);

  const fetchData = () => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/1CatcEnNR5KpWCfPz-95YUVlE2WVDY4bYVFCNPP6Bnjo/values/${'A30:H42'}?majorDimension=COLUMNS&key=AIzaSyBEC-5QDF7ocl-iJpC_vyXJjKyCdlR39i0`
    )
      .then((response) => response.json())
      .then((json) => {
        const filteredData = json.values.map((row: any) =>
          row.filter((cell: any) => cell !== "")
        );
        setData(filteredData);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const convertedData: Array<data> = [];
  for(let index = 0; index < data[4].length; index++) {
    const tempData = {
      firstLanguage: data[4][index],
      secondLanguage: data[7][index]
    }
    convertedData.push(tempData)
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.list}>
      {convertedData.map((eachData: data) => {
        return (
          <ListElement data={eachData} />
        )
      })}
    </div>
  )
}

export default List