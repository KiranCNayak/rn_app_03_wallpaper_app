import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { createClient } from 'pexels';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';

import styles from './styles';
import { get_YYYYMMDD_HHMMSS_String } from '../../utils/utils';

const client = createClient(Config.PEXELS_API_KEY);

const ImageDisplay = props => {
  const { height, width } = useWindowDimensions();

  const [activityIndicator, setActivityIndicator] = useState(true);
  const [imageBGColor, setImageBGColor] = useState('#222222');
  const [imageDesc, setImageDesc] = useState('Image from Wallpaper App by KCN');
  const [imageUri, setImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const id = props.route.params.id;

  const loadImage = () => {
    setIsLoading(true);
    client.photos.show({ id }).then(photo => {
      setImageDesc(photo.alt);
      setImageBGColor(photo.avg_color);
      setImageUri(photo.src.original);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadImage();
  }, []);

  const getStringAfterLastPeriodChar = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const downloadImage = () => {
    let ext = getStringAfterLastPeriodChar(imageUri);
    ext = '.' + ext[0];

    // If there is query parameter at the end, we need to ignore it
    //  so we use the first string of such split, that doesn't have
    //  the query parameter values.
    ext = ext.split('?')[0];

    const { config, fs } = RNFetchBlob;
    const PictureDir = fs.dirs.PictureDir;

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/WallpaperAppKCN_' +
          get_YYYYMMDD_HHMMSS_String(new Date()) +
          ext,
        description: imageDesc,
      },
    };

    config(options)
      .fetch('GET', imageUri)
      .then(({ data }) => {
        Alert.alert(
          'Image downloaded successfully !',
          'Image is located at ' + data,
        );
      })
      .catch(_error => {
        Alert.alert(
          "Couldn't Download this image",
          'Please try again.\nHave you given the storage permission ?',
        );
      });
  };

  const isStoragePermissionGrantedAlready = cb => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then(cb);
  };

  const requestStoragePermissionWithRationale = async () => {
    try {
      const permissionRationale = {
        title: 'Permission to save image to your Device',
        message:
          'Wallpaper App needs access to your storage ' +
          'so you can dowload awesome wallpapers',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      };
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        permissionRationale,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadImage();
      } else {
        Alert.alert(
          'Storage permission is required',
          "Please try again. If you are not able to proceed further, Go to your device Settings > Apps > Wallpaper App by KCN > App permissions > Files and media > 'Click on Allow'",
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onBackTouchablePress = () => props.navigation.goBack();

  const onDownloadTouchablePress = () => {
    isStoragePermissionGrantedAlready(status => {
      if (status) {
        downloadImage();
      } else {
        requestStoragePermissionWithRationale();
      }
    });
  };

  const setActivityIndicatorStatus = status => () => {
    setActivityIndicator(status);
  };

  const renderDownloadTouchableComponent = (
    <View style={styles.downloadTouchableContainerStyle}>
      <LinearGradient
        colors={['transparent', '#0009', '#000']}
        style={styles.bottomLGStyle}>
        <TouchableOpacity
          onPress={onDownloadTouchablePress}
          style={styles.downloadTouchableStyle}>
          <Icon color="#000" name="download" size={32} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const renderBackButtonTouchableComponent = (
    <View style={styles.backButtonTouchableContainerStyle}>
      <TouchableOpacity
        onPress={onBackTouchablePress}
        style={styles.backButtonTouchableStyle}>
        <Icon color="#FFF" name="chevron-left" size={18} />
      </TouchableOpacity>
    </View>
  );

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
      {renderBackButtonTouchableComponent}
      {renderDownloadTouchableComponent}
    </ImageBackground>
  );

  return (
    <View style={[styles.container, { backgroundColor: imageBGColor }]}>
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
