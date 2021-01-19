// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';
import validate, { checkValidations } from './helpers/new_character_helper';

const NewCharacter = props => {
  const [lang] = useTranslation('new_character');

  const [response, setResponse] = useState(null);
  const [validation, setValidation] = useState({
    name: {
      uniqueness: true,
      length: true,
    },
    alias: { length: true, },
    bio: { length: true, },
    universe: { length: true, },
  });
  const [field, setField] = useState({
    name: '',
    alias: '',
    bio: '',
    universe: '',
  });

  useEffect(() => {
    if (response && response.status === 'SUCCESS') {
      props.history.push('/characters');
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();

    if (validation) {
      const fetch = await api_call('POST', '/api/v1/characters', { character: field, });
      setResponse(fetch);
    }
  };
  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });

    validate(event.target.name, event.target.value, props.session.characters, validation, setValidation);
  };

  return (
    <>
    {props.session.log === 'NOT_LOGGED_IN' ?
      <Redirect to='/login' />
    :
      <div>
        <h1>{lang('title')}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text" name="name" placeholder={lang('placeholders.name')}
            value={field.name} onChange={handleChange} required
          />
          {validation.name.uniqueness === 'bad' ?
            <p>{lang('errors.uniqueness')}</p> : null
          }
          {validation.name.length === 'bad' ?
            <p>{lang('errors.length')}</p> : null
          }
          <input
            type="text" name="alias" placeholder={lang('placeholders.alias')}
            value={field.alias} onChange={handleChange}
          />
          {validation.alias.length === 'bad' ?
            <p>{lang('errors.length')}</p> : null
          }
          <textarea
            name="bio" placeholder={lang('placeholders.bio')}
            value={field.bio} onChange={handleChange}
          />
          {validation.bio.length === 'bad' ?
            <p>{lang('errors.length')}</p> : null
          }
          <input
            type="text" name="universe" placeholder={lang('placeholders.universe')}
            value={field.universe} onChange={handleChange}
          />
          <button type="submit">{lang('button')}</button>
        </form>
      </div>
    }
    </>
  )
}

export default NewCharacter;