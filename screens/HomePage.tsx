import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

// Define Navigation Types
type RootStackParamList = {
  Home: undefined;
  LanguageSelection: undefined;
  ContractUpload: undefined;
  ContractSummary: undefined;
  RiskAssessment: undefined;
  LegalAssistant: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, "Home">;

export default function HomePage() {
  const navigation = useNavigation<NavigationProps>();

  const recentContracts = [
    { id: "1", title: "Rental Agreement", date: "Uploaded on 4 Feb, 2025" },
    { id: "2", title: "Employment Contract", date: "Uploaded on 1 Feb, 2025" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LegalSutra</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LanguageSelection")} activeOpacity={0.7}>
          <Ionicons name="language" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Main Content - Use FlatList as the main container */}
      <FlatList
        data={recentContracts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecentContractCard title={item.title} date={item.date} onPress={() => navigation.navigate("ContractSummary")} />
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.welcomeText}>Welcome, User</Text>
            <Text style={styles.subText}>What would you like to do today?</Text>

            {/* Upload Button */}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => navigation.navigate("ContractUpload")}
              activeOpacity={0.7}
            >
              <Ionicons name="cloud-upload" size={24} color={colors.white} />
              <Text style={styles.uploadButtonText}>Upload New Contract</Text>
            </TouchableOpacity>

            {/* Features Section */}
            <View style={styles.featuresContainer}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.featuresGrid}>
                <FeatureCard icon="document-text" title="Contract Summary" onPress={() => navigation.navigate("ContractSummary")} />
                <FeatureCard icon="shield-checkmark" title="Risk Assessment" onPress={() => navigation.navigate("RiskAssessment")} />
                <FeatureCard icon="chatbubbles" title="Legal Assistant" onPress={() => navigation.navigate("LegalAssistant")} />
              </View>
            </View>

            {/* Recent Contracts Section */}
            <Text style={styles.sectionTitle}>Recent Contracts</Text>
          </>
        }
      />
    </SafeAreaView>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}

function FeatureCard({ icon, title, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity style={styles.featureCard} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={32} color={colors.primary} />
      <Text style={styles.featureCardTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

// Recent Contract Card Component
interface RecentContractCardProps {
  title: string;
  date: string;
  onPress: () => void;
}

function RecentContractCard({ title, date, onPress }: RecentContractCardProps) {
  return (
    <TouchableOpacity style={styles.recentContractCard} onPress={onPress} activeOpacity={0.7}>
      <View>
        <Text style={styles.recentContractTitle}>{title}</Text>
        <Text style={styles.recentContractDate}>{date}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}

// Centralized Colors for Consistency
const colors = {
  primary: "#1a365d",
  secondary: "#008080",
  white: "#ffffff",
  textGray: "#666",
  background: "#f5f5f5",
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 24,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  uploadButtonText: {
    color: colors.white,
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
    color: colors.primary,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  featureCard: {
    width: "48%",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  featureCardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
    marginTop: 8,
    textAlign: "center",
  },
  recentContractCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  recentContractTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  recentContractDate: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 4,
  },
});

