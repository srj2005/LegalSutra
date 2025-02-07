'use client';

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export default function ContractUpload() {
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      });

      if (result.type === 'success') {
        setSelectedFile(result);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const uploadContract = () => {
    if (selectedFile) {
      // Here you would typically upload the file to your server
      // For now, we'll just navigate to the ContractSummary screen
      navigation.navigate('ContractSummary' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Contract</Text>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
          <Ionicons name="cloud-upload" size={48} color="#1a365d" />
          <Text style={styles.uploadText}>
            {selectedFile ? selectedFile.name : 'Tap to upload your contract'}
          </Text>
          <Text style={styles.uploadSubtext}>Supported formats: PDF, DOCX (Max 10MB)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.uploadButton, !selectedFile && styles.uploadButtonDisabled]}
          onPress={uploadContract}
          disabled={!selectedFile}
        >
          <Text style={styles.uploadButtonText}>Upload and Analyze</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a365d',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  uploadArea: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1a365d',
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadText: {
    fontSize: 16,
    color: '#1a365d',
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center',
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#008080',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
