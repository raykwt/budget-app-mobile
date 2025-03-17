import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ChevronRight, Bell, Lock, CircleHelp as HelpCircle, LogOut, User } from 'lucide-react-native';

export default function SettingsScreen() {
  const settingsItems = [
    {
      icon: User,
      title: 'Account',
      subtitle: 'Personal information',
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Customize notifications',
    },
    {
      icon: Lock,
      title: 'Security',
      subtitle: 'Password, PIN, biometric',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'FAQs, contact us',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitials}>JD</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
      </View>

      <View style={styles.settingsSection}>
        {settingsItems.map((item, index) => (
          <Pressable key={index} style={styles.settingsItem}>
            <View style={styles.settingsItemIcon}>
              <item.icon size={24} color="#64748b" />
            </View>
            <View style={styles.settingsItemContent}>
              <Text style={styles.settingsItemTitle}>{item.title}</Text>
              <Text style={styles.settingsItemSubtitle}>{item.subtitle}</Text>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton}>
        <LogOut size={20} color="#dc2626" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    color: '#0f172a',
    fontFamily: 'Inter-SemiBold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  settingsSection: {
    backgroundColor: '#ffffff',
    marginTop: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  settingsItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter-Medium',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#dc2626',
    fontFamily: 'Inter-SemiBold',
  },
  version: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
    fontSize: 14,
    color: '#94a3b8',
    fontFamily: 'Inter-Regular',
  },
});