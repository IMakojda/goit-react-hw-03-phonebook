import React from "react";
import s from './contacts.module.css'
import PropTypes from 'prop-types';

const ContactItem = ({ itemKey, nameItem, numberIem, onDelete }) => {
  return (
    <li key={itemKey} className={s.list__item}>
      <p className={s.list__name}>{nameItem} :<span className={s.list__span}>{numberIem}</span></p>
      <button onClick={() => { onDelete(itemKey) }} className={s.list__btn} >delete</button>
    </li>
  );
}

export default ContactItem;

ContactItem.propTypes = {
  itemKey: PropTypes.string.isRequired,
  nameItem: PropTypes.string.isRequired,
  numberIem: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};