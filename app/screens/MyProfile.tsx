import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import * as Progress from 'react-native-progress';
import { FIREBASE_Auth } from '../../FirebaseConfig';
import { signOut } from 'firebase/auth';

interface Skill {
  name: string;
  currentXP: number;
  nextLevelXP: number;
  level: number;
}

interface MyProfileProps {
  skills: Skill[];
}

const MyProfile: React.FC<MyProfileProps> = ({ skills }) => {
  const profileImageUri = 'https://miro.medium.com/v2/resize:fit:1024/1*4U9QUb2RvW5-ra6IqcecBQ.png';
  const [currentLevelProgress, setCurrentLevelProgress] = useState(0);
  const [skillProgresses, setSkillProgresses] = useState<number[]>(Array(skills.length).fill(0));

  useEffect(() => {
    setCurrentLevelProgress(0.75); // Set main circle progress
    // Animate all skills at the same time but with different fill durations
    const delay = 500; // Start after 500 ms
    setTimeout(() => {
      setSkillProgresses(skills.map(skill => skill.currentXP / skill.nextLevelXP));
    }, delay);
  }, [skills]);

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_Auth);
      Alert.alert("Logged Out", "You have successfully logged out.");
    } catch (error) {
      Alert.alert("Logout Failed", "Could not log out at this time. Please try again.");
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
      <View style={styles.ProfileContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={{ fontSize: 19 }}>{FIREBASE_Auth.currentUser?.displayName}</Text>
            <Text style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 5 }}>Email: {FIREBASE_Auth.currentUser?.email}</Text>
            <Text style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 5 }}>Age: 22</Text>
          </View>
          <Progress.Circle
            size={130}
            progress={currentLevelProgress}
            thickness={7}
            showsText={true}
            color="#6200EE"
            unfilledColor="#e0e0e0"
            borderColor="#ccc"
            formatText={() => `${Math.round(currentLevelProgress * 100)}%`}
            textStyle={styles.circleText}
            animated={true}
          >
            <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
          </Progress.Circle>
        </View>
      </View>
      <View style={styles.container}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillContainer}>
            <View style={styles.skillHeader}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.skillLevel}>Lvl: {skill.level}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <Progress.Bar
                progress={skillProgresses[index] || 0}
                width={Dimensions.get('window').width - 80}
                height={25}
                color="#6200EE"
                borderColor="#ccc"
                unfilledColor="#e0e0e0"
                animated={true}
                animationType="spring"
                duration={1000 + index * 500}  // Increasing duration for each subsequent bar
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.progressText}>
                {skill.currentXP} / {skill.nextLevelXP}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    top: 65,
    left: 20,
    padding: 8,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ProfileContainer: {
    padding: 24,
    marginTop: 80,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginHorizontal:30,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop:0,
  },
  skillContainer: {
    marginBottom: 12,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 14,
  },
  skillLevel: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    position: 'relative',
  },
  progressBar: {
    width: Dimensions.get('window').width - 100,
    height: 25,
  },
  button: {
    alignItems:'center',
    marginLeft: 10,
    backgroundColor: '#6200EE',
    borderRadius: 5,
    padding: 5,
    width:35,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  circleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  profileImage: {
    top:7,
    right:8,
    position: 'absolute',
    width: 115,
    height: 115,
    borderRadius: 100,
  },
});

export default MyProfile;
