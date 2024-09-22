"use client"
import { Box, Button, Stack, TextField } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
// import ReactMarkdown from 'react-markdown'
import styles from './components.module.css'

export default function Chatbot({ chatbot, setChatbot, myPrompt, feedback, formatData }) {
  const [messages, setMessages] = useState([
    { role: 'system', content: myPrompt + feedback },
    {
      role: 'assistant',
      content: "Hey there! I'm your ResuMate. It looks like you've just received my assessment of your resume. I hope it was helpful! Is there anything else I can assist you with?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return
    setIsLoading(true)

    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        {
          role: 'assistant',
          content: "Oops! Something went wrong! Please try again later",
        },
      ])
    }
    setIsLoading(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  useEffect(() => {
    scrollToBottom()
    // window.scrollBy(0, 20)
  }, [messages])

  return (

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="top"
        alignItems="center"
        bgcolor="background.default"
      >
        <h2>Consultant from ResuMate</h2>
        <br/>
        <Stack
          direction={'column'}
          width="80%"
          height="700px"
          bgcolor="background.paper"
          border="1px solid"
          borderColor="primary.main"
          p={2}
          spacing={3}
        >
          <Stack
            direction={'column'}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.slice(1).map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? 'primary.main'
                      : 'secondary.main'
                  }
                  color={message.role === 'assistant' ? 'white' : 'black'}
                  borderRadius={10}
                  p={2}
                  maxWidth="75%"
                  wordbreak="break-word"
                  boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                  textAlign="left"
                >
                  {/* <ReactMarkdown>{message.content}</ReactMarkdown> */}
                  <p dangerouslySetInnerHTML={{ __html: formatData(message.content)} } className={styles.p}></p>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              variant="outlined"
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
                input: { color: 'black' }, // Sets input text color to black
                label: { color: 'black' }, // Optional: Sets label color to black
              }}
              InputProps={{
                style: {
                  color: 'black', // Ensures input text color is black
                },
              }}
            />

            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={isLoading}
              sx={{ bgcolor: isLoading ? 'grey' : 'primary.main' }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Stack>
        </Stack>
      </Box>
  )
}
