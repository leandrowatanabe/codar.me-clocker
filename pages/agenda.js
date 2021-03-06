import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFetch } from '@refetty/react'
import { addDays, subDays, format } from 'date-fns'
import axios from 'axios'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { 
    Button, 
    Container, 
    Box, 
    IconButton, 
    Spinner
} from '@chakra-ui/react'

import { getToken } from './../config/firebase/client'
import { useAuth, Logo, formatDate, AgendaBlock } from './../components'

const getAgenda = async (when) => {
    const token = await getToken()

    return axios({
        method: 'get',
        url: '/api/agenda',
        params: { date: format(when, 'yyyy-MM-dd'), },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getUser = async (userId) => {
    const token = await getToken()

    return axios({
        method: 'get',
        url: '/api/user',
        params: {userId: `${userId}`},
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const Header = ({ children }) => (
    <Box p={4} display="flex" alignItems="center" justifyContent="space-between">
        {children}
    </Box>
)


export default function Agenda() {
    const router = useRouter()
    const [auth, { logout }] = useAuth()
    const [when, setWhen] = useState(() => new Date())
    const [agendaData, { loading }, agendaFetch] = useFetch(getAgenda, { lazy: true })
    const [usernameData, , usernameFetch] = useFetch(getUser, { lazy: true })
    const addDay = () => setWhen(prevState => addDays(prevState, 1))
    const removeDay = () => setWhen(prevState => subDays(prevState, 1))

    useEffect(() => {
        auth.user?usernameFetch(auth.user.uid):console.log("sem user")   
        !auth.user && router.push('/')        
    }, [auth.user])

    const username = usernameData?.map(data=>(data.username))

    useEffect(() => {
        agendaFetch(when)
    }, [when])

    return (
        <Container>
            <Header>
                <Logo size={150} />
                <Button onClick={()=>{router.push(`/${username}`)}}>{username}</Button>
                <Button onClick={logout}>Sair</Button>
            </Header>

            <Box mt={8} display="flex" alignItems="center">
                <IconButton icon={<ChevronLeftIcon />} bg="transparent" onClick={removeDay} />
                <Box flex={1} textAlign="center">{formatDate(when, 'PPPP')}</Box>
                <IconButton icon={<ChevronRightIcon />} bg="transparent" onClick={addDay} />
            </Box>

            {loading && <Spinner tickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}

            {agendaData?.map(doc => (
                <AgendaBlock key={doc.time} userId={doc.userId} date={doc.date} time={doc.time} name={doc.name} phone={doc.phone} mt={4} />
            ))}
        </Container>
    )
}