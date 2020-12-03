import React from 'react';

const Persons = ({persons, filterStr}) => {
  const personsToShow = persons.filter(person =>
      person.name.toLowerCase().includes(filterStr.trim().toLowerCase()))

  console.log('persons that contain', filterStr.trim(), 'are', personsToShow)

  return (
      <div>
        {personsToShow.map(person =>
            <div key={person.name}>{person.name} {person.number}</div>)}
      </div>
  );
}

export default Persons;