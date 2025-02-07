import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

// Define the type for navigation props
type NavigationProps = StackNavigationProp<any, any>

export default function ContractSummaryPage() {
  const [activeTab, setActiveTab] = useState<string>("summary")
  const navigation = useNavigation<NavigationProps>() // Use type for navigation

  const getRiskColor = (score: number) => {
    if (score < 30) return "#22c55e" // green-500
    if (score < 60) return "#eab308" // yellow-500
    return "#ef4444" // red-500
  }

  const riskScore = 75 // Example risk score

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contract Analysis</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rental Agreement</Text>
          <View style={styles.riskScoreContainer}>
            <Text style={styles.riskScoreLabel}>Risk Score</Text>
            <Text style={[styles.riskScoreValue, { color: getRiskColor(riskScore) }]}>{riskScore}%</Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: getRiskColor(riskScore) }]} />
          <View style={styles.riskMessageContainer}>
            <Ionicons name="alert-triangle" size={16} color="#ef4444" />
            <Text style={styles.riskMessage}>High risk. Review carefully.</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "summary" && styles.activeTab]}
            onPress={() => setActiveTab("summary")}
          >
            <Text style={[styles.tabText, activeTab === "summary" && styles.activeTabText]}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "highlighted" && styles.activeTab]}
            onPress={() => setActiveTab("highlighted")}
          >
            <Text style={[styles.tabText, activeTab === "highlighted" && styles.activeTabText]}>Highlighted</Text>
          </TouchableOpacity>
        </View>

        {activeTab === "summary" ? (
          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Contract Summary</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• 12-month lease agreement for residential property</Text>
              <Text style={styles.bulletItem}>• Monthly rent: ₹20,000</Text>
              <Text style={styles.bulletItem}>• Security deposit: ₹40,000 (2 months' rent)</Text>
              <Text style={styles.bulletItem}>• Utilities to be paid by tenant</Text>
              <Text style={styles.bulletItem}>• No pets allowed</Text>
              <Text style={styles.bulletItem}>• Maintenance responsibilities split between landlord and tenant</Text>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Important Terms</Text>
            <View style={styles.highlightedList}>
              <Text style={[styles.highlightedItem, { backgroundColor: "#fef08a" }]}>
                Rent due on the 5th of each month
              </Text>
              <Text style={[styles.highlightedItem, { backgroundColor: "#fecaca" }]}>
                Late fee of ₹100 per day for delayed rent
              </Text>
              <Text style={[styles.highlightedItem, { backgroundColor: "#fef08a" }]}>
                Tenant responsible for minor repairs up to ₹1,000
              </Text>
              <Text style={[styles.highlightedItem, { backgroundColor: "#bbf7d0" }]}>
                Landlord responsible for major repairs and maintenance
              </Text>
              <Text style={[styles.highlightedItem, { backgroundColor: "#fecaca" }]}>
                No subletting allowed without written permission
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.viewDocumentButton}>
          <Ionicons name="eye-outline" size={20} color="#1a365d" />
          <Text style={styles.viewDocumentButtonText}>View Full Document</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  riskScoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  riskScoreLabel: {
    fontSize: 14,
    color: "#666",
  },
  riskScoreValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  riskMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  riskMessage: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
  },
  activeTab: {
    borderBottomColor: "#1a365d",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#1a365d",
    fontWeight: "bold",
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  highlightedList: {
    marginTop: 8,
  },
  highlightedItem: {
    fontSize: 14,
    padding: 4,
    marginBottom: 4,
    borderRadius: 4,
  },
  viewDocumentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1a365d",
  },
  viewDocumentButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#1a365d",
    fontWeight: "bold",
  },
})
