import React from 'react';
import Reminder from '../models/reminder';

interface ReminderListProps {
  items: Reminder[],
  onRemoveReminder: (id: number) => void;
}

function ReminderList({ items, onRemoveReminder }: ReminderListProps) {
  return (
    <ul>
      {
        items.map( (item, index) => <li key={index}>
            {item.title}
            <button onClick={() => onRemoveReminder(item.id)}>Delete</button>
          </li>
        )
      }
    </ul>
  );
}

export default ReminderList;