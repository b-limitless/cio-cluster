import React from "react";
import styles from "./measurement.module.scss";
import { RectangelData } from "@pasal/cio-component-library";

type Props = {}


export default function Measurement({ }: Props) {
  const measurementDataStructure = [
    { "title": "neck", "value": 15.5 },
    { "title": "chest", "value": 40.0 },
    { "title": "waist", "value": 34.5 },
    { "title": "hips", "value": 40.5 },
    { "title": "shoulder", "value": 18.0 },
    { "title": "sleeve", "value": 34.0 },
    { "title": "shirt", "value": 29.5 },
    { "title": "inseam", "value": 32.0 }
  ]
  
  const data: any = {};
  
  
  measurementDataStructure.forEach((item: any) => data[item.title] = item.value);
  

  
  return (
    <div className={styles.container}>
      <RectangelData data={{ "": data }} />
     
    </div>
  )
}