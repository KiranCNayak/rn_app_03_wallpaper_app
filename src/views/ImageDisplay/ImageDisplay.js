import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { createClient } from 'pexels';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const client = createClient(Config.PEXELS_API_KEY);

const ImageDisplay = props => {
  const { height, width } = useWindowDimensions();

  const [activityIndicator, setActivityIndicator] = useState(true);
  const [imageUri, setImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const id = props.route.params.id;

  const loadImage = () => {
    setIsLoading(true);
    client.photos.show({ id }).then(photo => {
      setImageUri(photo.src.medium);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadImage();
  }, []);

  const onBackTouchablePress = () => props.navigation.goBack();

  const setActivityIndicatorStatus = status => () => {
    setActivityIndicator(status);
  };

  const renderDownloadedImageComponent = (
    <ImageBackground
      imageStyle={{ resizeMode: 'contain' }}
      onLoadStart={setActivityIndicatorStatus(true)}
      onLoadEnd={setActivityIndicatorStatus(false)}
      source={{ uri: imageUri }}
      style={styles.fullScreenStyle}>
      <ActivityIndicator
        animating={activityIndicator}
        color="#FFF"
        size="large"
        style={{
          position: 'absolute',
          top: 0.5 * height,
          right: 0.45 * width,
        }}
      />
      <View>
        <TouchableOpacity
          onPress={onBackTouchablePress}
          style={styles.backButtonTouchableStyle}>
          <Icon color="#FFF" name="chevron-left" size={18} />
        </TouchableOpacity>
      </View>
      <View style={styles.downloadTouchableContainerStyle}>
        <TouchableOpacity
          // TODO: onPress={Handle Download Image}
          style={styles.downloadTouchableStyle}>
          <Icon color="#000" name="download" size={32} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      {!(isLoading || imageUri === '') ? (
        renderDownloadedImageComponent
      ) : (
        <>
          <View style={styles.backButtonTouchableContainerStyle}>
            <TouchableOpacity
              onPress={onBackTouchablePress}
              style={styles.backButtonTouchableStyle}>
              <Icon color="#2abb9b" name="chevron-left" size={18} />
            </TouchableOpacity>
          </View>
          <View style={[styles.fullScreenStyle, styles.imageBGStyle]}>
            <View style={styles.loadingIndicatorContainerStyle}>
              <ActivityIndicator color="#2abb9b" size="large" />
              <Text style={styles.downloadingImageTextStyle}>
                Downloading Image
              </Text>
              <Text style={styles.pleaseWaitTextStyle}>Please Wait...</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ImageDisplay;
