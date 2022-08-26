import { useEffect, useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css'
import ReminderList from './components/ReminderList'
import Reminder from './models/reminder'
import reminderService from './services/reminder'
import NewReminder from './components/NewReminder'
import axios from 'axios'

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Todos />
    </QueryClientProvider>
  )
}


function Todos(): JSX.Element {
  // const [reminders, setReminders] = useState<Reminder[]>([
  //   {id: 1, title: 'Reminder 1'}
  // ]);


  const [reminders, setReminders] = useState<Reminder[]>([]);

  const { isLoading, isError, error, data }: UseQueryResult<Reminder, Error> = useQuery<Reminder, Error>(['reminder'], async() => axios
      .get("http://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data))
  console.log(error)
  if (isLoading) return (
    <div className="App">
      Loading...
    </div>
  );

  if (isError) return (
    <div className="App">
      An error has occurred: " + error.message
    </div>
  );

  console.log(data)


  // useEffect(() => {
  //   loadReminders()
  // }, [])
  

  // const loadReminders = async () => {
  //   const reminders = await reminderService.getReminders()
  //   setReminders(reminders)
  // }

  // const { isLoading, error, data, isFetching } = useQuery(['todos'], reminderService.getReminders)


  // const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
  //   axios
  //     .get("https://api.github.com/repos/tannerlinsley/react-query")
  //     .then((res) => res.data)
  // );
  // console.log(data)
  // if (isLoading) return (
  //   <div className="App">
  //     Loading...
  //   </div>
  // );

  // if (error) return (
  //   <div className="App">
  //     An error has occurred: " + error.message
  //   </div>
  // );

  const removeReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  const addReminder = async (title: string) => {
     const newReminder = await reminderService.addReminder(title)
     setReminders([newReminder, ...reminders])
  }

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder}/>
      <ReminderList items={reminders} onRemoveReminder={removeReminder}/>
    </div>
  )
}


export default App
