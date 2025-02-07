import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

export default function HomePage() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LegalSutra</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LanguageSelection" as never)}>
          <Ionicons name="language" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, User</Text>
        <Text style={styles.subText}>What would you like to do today?</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate("ContractUpload" as never)}>
          <Ionicons name="cloud-upload" size={24} color="white" />
          <Text style={styles.uploadButtonText}>Upload New Contract</Text>
        </TouchableOpacity>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            <FeatureCard
              icon="document-text"
              title="Contract Summary"
              onPress={() => navigation.navigate("ContractSummary" as never)}
            />
            <FeatureCard
              icon="shield-checkmark"
              title="Risk Assessment"
              onPress={() => navigation.navigate("RiskAssessment" as never)}
            />
            <FeatureCard
              icon="chatbubbles"
              title="Legal Assistant"
              onPress={() => navigation.navigate("LegalAssistant" as never)}
            />
          </View>
        </View>

        <View style={styles.recentContractsContainer}>
          <Text style={styles.sectionTitle}>Recent Contracts</Text>
          <RecentContractCard
            title="Rental Agreement"
            date="Uploaded on 4 Feb, 2025"
            onPress={() => navigation.navigate("ContractSummary" as never)}
          />
          <RecentContractCard
            title="Employment Contract"
            date="Uploaded on 1 Feb, 2025"
            onPress={() => navigation.navigate("ContractSummary" as never)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function FeatureCard({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.featureCard} onPress={onPress}>
      <Ionicons name={icon} size={32} color="#1a365d" />
      <Text style={styles.featureCardTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

function RecentContractCard({ title, date, onPress }) {
  return (
    <TouchableOpacity style={styles.recentContractCard} onPress={onPress}>
      <View>
        <Text style={styles.recentContractTitle}>{title}</Text>
        <Text style={styles.recentContractDate}>{date}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#1a365d" />
    </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#008080",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  featureCardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a365d",
    marginTop: 8,
    textAlign: "center",
  },
  recentContractsContainer: {
    marginBottom: 24,
  },
  recentContractCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  recentContractTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a365d",
  },
  recentContractDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
})

