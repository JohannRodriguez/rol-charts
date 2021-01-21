// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Modules
import api_call from '../../api/api_call';

const Dashboard = props => {
  const [lang] = useTranslation('dashboard');

  const [characters, setCharacters] = useState(null);
  const [field, setField] = useState({ search: '', });

  useEffect(() => {
    if (!characters && props.session.log === 'LOGGED_IN') {
      let arr = [props.session.user.username];
      if (props.session.characters.length > 0) {
        arr = arr.concat(props.session.characters);
      }
      setCharacters(arr);
    }
  });


  const logout = async () => {
    await api_call('DELETE', '/api/v1/logout');
    props.logout();
  };
  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
        <main>
          <header>
            <select name="filter" id="filter">
              <option value="trending">{lang('options.trending')}</option>
              <option value="follow">{lang('options.follow')}</option>
              <option value="latest">{lang('options.latest')}</option>
            </select>
            <input
              type="text" name="search" placeholder={lang('placeholder')}
              value={field.search} onChange={handleChange}
            />
          </header>
          <button onClick={() => logout()}>Logout</button>
          <button onClick={() => {props.history.push('/settings')}}>Settings</button>
          <button onClick={() => {props.history.push(`${props.session.user.username}/characters`)}}>Characters</button>
        </main> 
      :
        <Redirect to='/login' />
      }
    </>
  );
};

export default Dashboard;
