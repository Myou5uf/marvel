import React, { useState } from "react";
import "./MyForm.scss";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import { object, string } from "yup";
import { useHttp } from "../../hooks/useHttp";
import MarvelServices from "../../services/MarvelServices";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/errorMessage/errorMessage";

const MyForm = () => {
    const [character, setCharacter] = useState(null);
    const [updateCharacter, loading, error, charClearError] = useHttp(async (characterName) => {
        if (!characterName) {
            return;
        }
        charClearError();
        const character = await MarvelServices.getCharacterByName(characterName);
        setCharacter(character);
    });

    const errorMess = error ? (
        <div className="form__error">
            <ErrorMessage error={error} />
        </div>
    ) : null;

    const result = !character ? null : character.length > 0 ? (
        <>
            <div className="form__success">There is! Visit {character[0].name} page?</div>
            <Link to={`/characters/${character[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </>
    ) : (
        <div className="form__not-found">The character was not found. Check the name and try again</div>
    );

    return (
        <Formik
            initialValues={{
                name: "",
            }}
            validationSchema={object({
                name: string().min(1, "Минимум 1 символ").required("This field is required"),
            })}
            onSubmit={({ name }) => updateCharacter(name)}>
            <Form className="form">
                <label className="form__title">Or find a character by name:</label>
                <div className="form__wrapper">
                    <Field type="text" name="name" className="form__input" placeholder="Enter name" />
                    <button className="button button__main" type="submit" disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                </div>
                <div className="form__result">
                    {result ? null : <FormikErrorMessage component="div" className="form__validate" name="name" />}
                    {errorMess}
                    {result}
                </div>
            </Form>
        </Formik>
    );
};

export default MyForm;
