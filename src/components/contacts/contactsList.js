import React from "react";
import s from './contacts.module.css'

const ContactList = ({ contactList, onDelete }) => {
    return (
        <ul className={s.list}>
            {contactList.map(({ id, name, number }) => (
                <li key={id} className={s.list__item}>
                    <p className={s.list__name}>{name} :<span className={s.list__span}>{number}</span></p>
                    <button onClick={() => { onDelete(id) }} className={s.list__btn} >delete</button>
                </li>
            ))}
        </ul>
    );
} 

export default ContactList;