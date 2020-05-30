import * as React from 'react';
import {instance} from '../modules/Instance.js';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import Color from '../constants/Colors.js';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      page: 1
    }

  }

  fetch = async()=>{
    let posts = await instance.get('/api/home').then((resp)=>{
      if(resp.status != 200){
        return null;
      }
      return resp.data['posts'];
    });
    this.setState({posts: posts});
  }

  loadMore = async() => {
    this.setState({page: this.props.page+1});

    let posts = await instance.get('/api/home/'+this.props.page).then((resp)=>{
      if(resp.status != 200){
        return null;
      }
      return resp.data['posts'];
    });
    this.setState({posts: [...this.props.pages, ...posts]});
  }

  componentDidMount(){
    this.fetch();
  }

  render(){
    return(
      <ScrollView style={styles.container} onEndReachedThreshold={0.4} onEndReached={this.loadMore.bind(this)}>
        {
          this.state.posts.map((item, key)=>
            <View style={styles.postCard} key={item.id}>
                <View>

                </View>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>Author: {item.author.name}</Text>
                  <Text>Tags: 
                    {
                      item.tags.map((tag, t_key)=>
                        <Text style={styles.tag} key={tag}> {tag}</Text>
                      )
                    }
                  </Text>
                </View>
            </View>
          )
        }
      </ScrollView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 10
  },
  postCard: {
    borderWidth: 1,
    borderColor: '#efefef',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  title: {
    fontSize: 18
  },
  tag: {
    borderRadius: 20,
    color: 'white',
    backgroundColor: Color.tintColor,
    overflow: "hidden"
  }
});
