import React, { useState } from "react";
import { Button, Input, Select, MultipleSelect, TextArea, InputAdornments, SelectWithAvatar, DatePicker } from "@pasal/cio-component-library";
import styles from "./assignment.module.scss";
import data from "../../../../../mock/asignee.json";





type Props = {}

export default function Assignment({ }: Props) {

   const languages = [
    {
      title: "English",
      value: "en",
    },
    {
      title: "Nepali",
      value: "np",
    },
    {
      title: "Italian",
      value: "it",
    }
  ];

  const getLanguagesInArray = languages.map((language) => language.title);
  const [userLanguage, setUserLanguage] = useState("");

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setUserLanguage(
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <div className={styles.assignment}>
      <div className={styles.form}>
        <div className={styles.row}>
          <SelectWithAvatar
            label="Asingee"
            showOptionLabel="fullName"
            avatarProps="avatar"
            data={data}
            renderOptionProps={["fullName", "email"]}
          />
        </div>

        <div className={styles.row}>
          <DatePicker
            label="Timeline"
            styleProps={{ width: "100%" }}

          />
        </div>

        <div className={styles.row}>
          <TextArea
            setter={() => { }}
            getter={""}
            styles={{ width: 'calc("100%" - "24px")' }}
            placeholder="Description"
            
          />
        </div>
      </div>

      <div className={styles.section}>
        <Button variant="primary" text="Update"/>
      </div>

    </div>
  )
}