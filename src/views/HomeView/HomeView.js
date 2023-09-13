import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { createClient } from 'pexels';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

import { IMAGE_CATEGORIES } from '../../constants/Constants';
import { IMAGES } from '../../data/IMAGES';
import styles from './styles';

const client = createClient(Config.PEXELS_API_KEY);

const HomeView = props => {
  const carouselRef = useRef(null);

  const [carouselItems, setCarouselItems] = useState([]);
  const [isTextInputFocussed, setIsTextInputFocussed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Animating the top search and text container
  const x = new Animated.Value(-100);

  const { width } = useWindowDimensions();

  const categoriesKE = ({ id }) => id;

  const findImages = () => {
    const query = 'Mountains';
    client.photos.search({ query, per_page: 5 }).then(({ photos }) => {
      setCarouselItems(photos);
    });
  };

  const onCategoryImagePress = item => () => {
    props.navigation.navigate('CategoryView', {
      query: item.title,
    });
  };

  const onTIFocussed = useCallback(
    isFocussed => () => {
      setIsTextInputFocussed(isFocussed);
    },
    [],
  );

  const onTopPicksImagePress = item => () => {
    props.navigation.navigate('ImageDisplay', {
      id: item.id,
    });
  };

  const onSearchQueryTextChange = value => setSearchQuery(value);

  const slide = () => {
    Animated.spring(x, {
      friction: 30,
      toValue: 0,
      useNativeDriver: 'true',
    }).start();
  };

  const submitQueryHandler = () => {
    if (searchQuery !== '') {
      props.navigation.navigate('CategoryView', {
        query: searchQuery,
      });
    }
  };

  useEffect(() => {
    // Run when component mounts
    slide();
    findImages();
  }, []);

  const renderCatogoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={onCategoryImagePress(item)}
        style={[styles.categoryItemContainerStyle, { width: 0.6 * width }]}>
        <ImageBackground
          source={{ uri: item.img_url }}
          style={styles.categoryBGImageStyle}>
          <LinearGradient
            colors={['transparent', '#000b', '#000']}
            style={styles.categoryLinearGradientContainerStyle}>
            <Text style={styles.categoryTextStyle}>{item.title}</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderTopPicksItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={onTopPicksImagePress(item)}
        style={styles.topPicksImageContainerStyle}>
        <Image
          source={{ uri: item.src.medium }}
          style={styles.topPicksImageStyle}
        />
      </TouchableOpacity>
    ),
    [],
  );

  const renderSeparator = () => <View style={styles.separatorStyle} />;

  const renderSearchAndImgBGView = () => {
    return (
      <ImageBackground
        source={IMAGES.IMG_ILLUSTRATION}
        style={styles.topSearchAndTitleBGContainerStyle}>
        <View style={styles.topSearchAndTitleContainerStyle}>
          <LinearGradient
            colors={['#000', '#000a', 'transparent']}
            style={styles.fullWidthStyle}>
            <Animated.View
              style={[
                styles.topTextContainerStyle,
                { transform: [{ translateX: x }] },
              ]}>
              <Text style={styles.sectionHeaderTextStyle}>
                Collection of Quality Wallpapers
              </Text>
            </Animated.View>
          </LinearGradient>
          <LinearGradient
            colors={['transparent', '#000a', '#000']}
            style={styles.searchBGLinearGradientStyle}>
            <Animated.View
              style={[
                styles.searchBoxStyle,
                {
                  borderColor: isTextInputFocussed ? '#df2' : '#ff07',
                  borderWidth: isTextInputFocussed ? 4 : 2,
                  transform: [{ translateX: x }],
                },
              ]}>
              <TextInput
                onChangeText={onSearchQueryTextChange}
                onEndEditing={onTIFocussed(false)}
                onFocus={onTIFocussed(true)}
                onSubmitEditing={submitQueryHandler}
                placeholder="Search For Free Wallpapers"
                placeholderTextColor="gray"
                style={styles.textInputForSearchStyle}
                value={searchQuery}
              />
              <TouchableOpacity
                onPress={submitQueryHandler}
                style={styles.searchIconStyle}>
                <Icon color="#FFF" name="search" size={15} />
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  };

  const renderCategoriesListView = () =>
    useCallback(
      <>
        <View style={styles.categoriesHeaderTextContainerStyle}>
          <Text style={styles.sectionHeaderTextStyle}>Categories</Text>
        </View>

        <View style={styles.listStyle}>
          <FlatList
            alwaysBounceHorizontal={true}
            bounces={true}
            data={IMAGE_CATEGORIES}
            horizontal={true}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={categoriesKE}
            renderItem={renderCatogoryItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </>,
      [],
    );

  const renderTopPicksListView = () => {
    return (
      <View style={styles.flexContainerStyle}>
        <Text style={styles.sectionHeaderTextStyle}>Top Picks For You !</Text>

        <View style={styles.listStyle}>
          <Carousel
            activeSlideAlignment={'center'}
            bounces={true}
            data={carouselItems}
            itemWidth={0.7 * width}
            keyExtractor={item => item.id}
            layout={'default'}
            ref={carouselRef}
            renderItem={renderTopPicksItem}
            sliderWidth={width}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rootContainerStyle}>
        {renderSearchAndImgBGView()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewContainerStyle}>
          {renderTopPicksListView()}
          {renderCategoriesListView()}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeView;
