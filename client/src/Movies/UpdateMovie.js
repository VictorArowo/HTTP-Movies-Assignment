import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
const UpdateMovie = ({
  match: {
    params: { id }
  },
  movieList,
  history
}) => {
  const movieToEdit = movieList.find(item => item.id === Number(id));

  const updateMovie = ({ id, title, director, metascore, stars }) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        id,
        title,
        director,
        metascore,
        stars
      })
      .then(() => {
        history.push('/');
      })
      .catch(err => {});
  };

  return (
    <Formik
      //   key={currentQuoteId}
      //   validate={validate}
      initialValues={{
        title: movieToEdit.title,
        director: movieToEdit.director,
        metascore: movieToEdit.metascore
      }}
      onSubmit={({ title, director, metascore }) => {
        updateMovie({
          id: Number(id),
          title,
          director,
          metascore,
          stars: movieToEdit.stars
        });
      }}
      render={() => (
        <Form>
          <Field name="title" />
          <ErrorMessage name="title" component="span" />

          <Field name="director" />
          <ErrorMessage name="director" component="span" />

          <Field name="metascore" />
          <ErrorMessage name="metascore" component="span" />

          <input type="submit" />
        </Form>
      )}
    />
  );
};

export default UpdateMovie;
