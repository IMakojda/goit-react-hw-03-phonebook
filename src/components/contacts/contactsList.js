import React from "react";
import ContactItem from "./contactsItem";
import PropTypes from 'prop-types';
import s from './contacts.module.css'

const ContactList = ({ contactList, onDelete }) => {
    return (
        <ul className={s.list}>
            {contactList.map(({ id, name, number }) => (
                <ContactItem
                    nameItem={name}
                    numberIem={number}
                    onDelete={onDelete}
                    key={id}
                    itemKey={id}
                />
            ))}
        </ul>
    );
}

export default ContactList;

ContactList.propTypes = {
    contactList: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,

};