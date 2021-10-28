// contacts.js
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */
const contactsPath = path.join(__dirname, "db/contacts.json");
const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(result);
};

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  // ...твой код
  return await readData();
};

const getContactById = async (contactId) => {
  // ...твой код
  const contacts = await readData();
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  // ...твой код
  const contacts = await readData();
  const index = contacts.find((contact, index) =>
    contact.id === contactId ? index : null
  );
  console.log(index);
  if (index) {
    const result = contacts.splice(contacts.indexOf(index), 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } else {
    return null;
  }
};

const addContact = async (name, email, phone) => {
  // ...твой код
  const contacts = await readData();
  if (contacts.some((contact) => contact.name === name)) {
    return null;
  } else {
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  //   const newContact = { id: crypto.randomUUID(), name, email, phone };
  //   contacts.push(newContact);
  //   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  //   return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
