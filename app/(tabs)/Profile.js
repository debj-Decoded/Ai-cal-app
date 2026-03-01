import React, { useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { UserContext } from '../../context/UserContext';

export default function Profile() {
const {user}=useContext(UserContext)
 

  const menuItems = [
    { title: 'Personal Information', icon: '👤' },
    { title: 'My Goals', icon: '🎯' },
    { title: 'AI Preferences', icon: '🤖', highlight: true },
    { title: 'Connected Devices', icon: '⌚' },
    { title: 'Notifications', icon: '🔔' },
    { title: 'Privacy Policy', icon: '🔒' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 1. Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
             <Text style={styles.avatarEmoji}>🧘‍♂️</Text>
             <TouchableOpacity style={styles.editBadge}>
                <Text style={{fontSize: 12}}>✏️</Text>
             </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Physical Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={styles.statValue}>{user.weight}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{user.height}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Daily Goal</Text>
            <Text style={styles.statValue}>{user.calories}</Text>
          </View>
        </View>

        {/* 3. Menu List */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View style={[styles.iconBg, item.highlight && styles.aiHighlight]}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                </View>
                <Text style={[styles.menuTitle, item.highlight && styles.aiTitleText]}>
                  {item.title}
                </Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  header: { alignItems: 'center', paddingVertical: 30 },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#EEE'
  },
  avatarEmoji: { fontSize: 50 },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.2)'
  },
  userName: { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
  userEmail: { fontSize: 14, color: '#888', marginTop: 4 },
  editProfileBtn: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F4A26115',
    borderWidth: 1,
    borderColor: '#F4A261'
  },
  editBtnText: { color: '#F4A261', fontWeight: '700' },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 25,
    justifyContent: 'space-around',
    boxShadow: '0px 5px 15px rgba(0,0,0,0.05)',
    elevation: 3
  },
  statBox: { alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#AAA', fontWeight: '600', marginBottom: 5 },
  statValue: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  divider: { width: 1, height: '100%', backgroundColor: '#EEE' },

  menuContainer: { marginTop: 30, paddingHorizontal: 20 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  aiHighlight: { backgroundColor: '#1A1A1A' }, // Matching your AI Card theme
  aiTitleText: { fontWeight: '700', color: '#1A1A1A' },
  menuIcon: { fontSize: 20 },
  menuTitle: { fontSize: 16, color: '#444', fontWeight: '500' },
  arrow: { fontSize: 24, color: '#CCC' },

  logoutBtn: { margin: 30, alignItems: 'center' },
  logoutText: { color: '#FF4B4B', fontWeight: '700', fontSize: 16 }
});