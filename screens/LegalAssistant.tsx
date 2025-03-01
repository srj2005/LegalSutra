"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import * as Speech from "expo-speech"
import Voice from "@react-native-voice/voice"
import { SpeechResultsEvent } from "@react-native-voice/voice";

export default function LegalAssistant() {
  const navigation = useNavigation()
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you with your contract today?", sender: "bot" },
  ])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value[0]) {
      const userMessage = { id: messages.length + 1, text: e.value[0], sender: "user" }
      setMessages((prevMessages) => [...prevMessages, userMessage])
      handleBotResponse(e.value[0])
    }
  }

  const startListening = async () => {
    try {
      await Voice.start("en-US")
      setIsListening(true)
    } catch (e) {
      console.error(e)
    }
  }

  const stopListening = async () => {
    try {
      await Voice.stop()
      setIsListening(false)
    } catch (e) {
      console.error(e)
    }
  }

  const handleBotResponse = (userMessage: any) => {
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `I understand you said: "${userMessage}". How can I help you with that?`,
        sender: "bot",
      }
      setMessages((prevMessages) => [...prevMessages, botResponse])
      speakBotResponse(botResponse.text)
    }, 1000)
  }

  const speakBotResponse = async (text:string) => {
    setIsSpeaking(true)
    try {
      await Speech.speak(text, {
        language: "en",
        onDone: () => setIsSpeaking(false),
      })
    } catch (e) {
      console.error(e)
      setIsSpeaking(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal Assistant</Text>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
      </View>

      <ScrollView style={styles.messageContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[styles.messageBubble, message.sender === "bot" ? styles.botBubble : styles.userBubble]}
          >
            <Text style={[styles.messageText, message.sender === "user" && styles.userMessageText]}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        {isSpeaking ? (
          <View style={styles.speakingIndicator}>
            <ActivityIndicator size="small" color="#008080" />
            <Text style={styles.speakingText}>Assistant is speaking...</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPress={isListening ? stopListening : startListening}
          >
            <Ionicons name={isListening ? "mic" : "mic-outline"} size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1a365d",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  messageContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e7eb",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#1a365d",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  userMessageText: {
    color: "white",
  },
  inputContainer: {
    padding: 16,
    backgroundColor: "white",
    alignItems: "center",
  },
  micButton: {
    backgroundColor: "#008080",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  micButtonActive: {
    backgroundColor: "#006666",
  },
  speakingIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  speakingText: {
    marginLeft: 8,
    color: "#008080",
    fontSize: 16,
  },
})

