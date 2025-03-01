import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons';

export default function RiskAssessment() {
  const navigation = useNavigation()
  const riskScore = 75

  const getRiskColor = (score: number) => {
    if (score < 30) return "#22c55e" 
    if (score < 60) return "#eab308" 
    return "#ef4444" 
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Risk Assessment</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.riskScoreContainer}>
            <Ionicons name={"alert-triangle" as any} size={24} color={getRiskColor(riskScore)} />
            <Text style={styles.riskScoreTitle}>Risk Score</Text>
          </View>
          <View style={styles.riskScoreValueContainer}>
            <Text style={[styles.riskScoreValue, { color: getRiskColor(riskScore) }]}>{riskScore}</Text>
            <Text style={styles.riskScoreMax}>/100</Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: getRiskColor(riskScore), width: `${riskScore}%` }]} />
          <Text style={styles.riskMessage}>
            This contract has a {riskScore < 30 ? "low" : riskScore < 60 ? "moderate" : "high"} risk level. Review the
            highlighted issues below.
          </Text>
        </View>

        

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Compliance with Indian Laws</Text>
            <View style={styles.complianceList}>
              <ComplianceItem icon={"checkmark-circle" as any} color="#22c55e" text="Adheres to Rent Control Act" />
              <ComplianceItem icon={"checkmark-circle" as any} color="#22c55e" text="Follows standard eviction procedures" />
              <ComplianceItem icon={"close-circle" as any} color="#ef4444" text="Security deposit exceeds legal limit" />
            </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Potential Issues</Text>
          <View style={styles.issuesList}>
            <IssueItem
              title="Vague maintenance responsibilities"
              description="Clause 8 doesn't clearly define tenant vs landlord responsibilities"
            />
            <IssueItem
              title="No clause for natural disasters"
              description="Contract doesn't address rent adjustments in case of force majeure events"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

type IconName = 
  | "cloud-upload"
  | "document-text"
  | "shield-checkmark"
  | "chatbubbles"
  | "chevron-forward";

interface FeatureCardProps {
  icon: IconName; 
  color: string; 
  text:string;
}

function ComplianceItem({ icon,color, text }: FeatureCardProps) {
  return (
    <View style={styles.complianceItem}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={styles.complianceText}>{text}</Text>
    </View>
  )
}

interface RecentContractCardProps {
  title: string;
  description: string;
}

function IssueItem({ title, description }:RecentContractCardProps) {
  return (
    <View style={styles.issueItem}>
      <Ionicons name={"alert-triangle" as any} size={20} color="#eab308" />
      <View style={styles.issueTextContainer}>
        <Text style={styles.issueTitle}>{title}</Text>
        <Text style={styles.issueDescription}>{description}</Text>
      </View>
    </View>
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
  riskScoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  riskScoreTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  riskScoreValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 8,
  },
  riskScoreValue: {
    fontSize: 48,
    fontWeight: "bold",
  },
  riskScoreMax: {
    fontSize: 24,
    color: "#666",
    marginLeft: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  riskMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  complianceList: {
    marginTop: 8,
  },
  complianceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  complianceText: {
    marginLeft: 8,
    fontSize: 16,
  },
  issuesList: {
    marginTop: 8,
  },
  issueItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  issueTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  issueDescription: {
    fontSize: 14,
    color: "#666",
  },
})

