import { useState } from 'react'
import axios from 'axios'

import { 
    Button, 
    Box, 
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react'

const deletar = async (docId) => axios({
    method: 'post',
    url: '/api/deletar',
    data: {
        docId:docId
    },
})


const ModalDelete = ({ isOpen, onClose, time, docId }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Confirmação</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Deseja cancelar o agendamento das {time}?</Text>
            </ModalBody>

            <ModalFooter>
                {<Button variant="ghost" onClick={onClose}>Não cancelar</Button>}
                <Button colorScheme="red" mr={3} onClick={()=>{deletar(docId);window.location.reload(false)}}>
                    Confirmar Cancelamento
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
)
    

export const AgendaBlock = ({ userId, date, time, name, phone, ...props }) => {

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(prevState => !prevState)

    return(
        <Box {...props} display="flex" bg="gray.100" borderRadius={8} p={4} alignItems="center">
        <Box flex={1}>{time}</Box>
        <Box textAlign="right">
            <Text fontSize="2xl">{name}</Text>
            <Text>{phone}</Text>
            <Button p={5} color="red"  onClick={toggle}>
                cancelar agendamento
                    {<ModalDelete
                    isOpen={isOpen}
                    onClose={toggle}
                    time={time}
                    docId={`${userId}#${date}#${time}`}
                >
                </ModalDelete>}
            </Button>
        </Box>
    </Box>
    )
}