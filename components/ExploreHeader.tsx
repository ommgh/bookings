import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Snowy escapes',
      icon: 'snowflake',
    },
    {
      name: 'Trending',
      icon: 'fire',
    },
    {
      name: 'Play',
      icon: 'gamepad-variant',
    },
    {
      name: 'City',
      icon: 'office-building',
    },
    {
      name: 'Beachfront',
      icon: 'beach',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
  ];

interface Props{
  onCategoryChange : (category : string) => void;
}

const ExploreHeader = ({ onCategoryChange}:Props) => {

    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex,setActiveIndex] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    const selectCategory = (index : number) => {
      const selected = itemsRef.current[index];
      setActiveIndex(index);

      selected?.measure((x) => {
        scrollRef.current?.scrollTo({ x: x - 20, y:0, animated: true });
      });
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onCategoryChange(categories[index].name);  

    };

  return (
    <SafeAreaView style={{flex : 1,backgroundColor:'#fff'}}>
    
     <View style={styles.container}>
        <View style={styles.actionRow}>
            <Link href={'/(modals)/booking'} asChild>
                <TouchableOpacity style={styles.searchbtn}>
                    <Ionicons name="search" size={24} color="black" />
                    <View>
                        <Text style={{fontFamily:'montserrat-sb'}}>Where To?</Text>
                        <Text style={{fontFamily:'montserrat-r',color:Colors.grey}}>Anywhere - Anytime</Text>
                    </View>
                </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.filterbtn}>
                <Ionicons name="options" size={24} color="black" />
            </TouchableOpacity>
        </View>

        <ScrollView
        ref={scrollRef} 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 16,
        }}>
            { categories.map((item, index) => (
                <TouchableOpacity
                onPress={() => selectCategory(index)}
                ref ={(el)=> itemsRef.current[index]= el} 
                style={activeIndex == index ? styles.categoriesBtnActive : styles.categoriesBtn}
                key={index}
                >
                    <MaterialCommunityIcons name={item.icon as any} size={24} color={activeIndex == index ? '#000' : Colors.grey}/>
                    <Text style={activeIndex == index ? styles.categoryTextActive : styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 140,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 24,
        paddingTop: 5,
        paddingHorizontal: 16,
    },
    filterbtn: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Colors.grey,
    },
    searchbtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        width: '83%',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 24,
        borderColor: '#c2c2c2',
        elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
      },
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'montserrat-sb',
        color: Colors.grey,
      },
      categoryTextActive: {
        fontSize: 14,
        fontFamily: 'montserrat-sb',
        color: '#000',
      },
      categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
      },
      categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
      },
})

export default ExploreHeader