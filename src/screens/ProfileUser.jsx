import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';

const RandomProfileScreen = () => {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();
    setProfiles(data.results);
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Generate Random Profiles" onPress={fetchProfiles} />
      <ScrollView style={styles.scroll}>
        <View style={styles.profileList}>
          {profiles.map((profile, index) => (
            <View style={styles.card} key={index}>
              <Image style={styles.avatar} source={{ uri: profile.picture.large }} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{profile.name.first} {profile.name.last}</Text>
                <Text style={styles.email}>{profile.email}</Text>
                <Text style={styles.phone}>{profile.phone}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  profileList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 10,
  },
  avatar: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
  },
});

export default RandomProfileScreen;
