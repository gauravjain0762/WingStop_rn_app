import Geolocation from 'react-native-geolocation-service';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import {GOOGLE_MAP_API_KEY} from './apiConstant';
import {errorToast} from './commonFunction';

export const requestLocationPermission = async (
  GetForcefully = true,
  onSuccess: (location: any) => void,
  onFail: any, // Use React Navigation or appropriate navigation prop
) => {
  if (Platform.OS === 'ios') {
    requestIOSPermission(GetForcefully, onSuccess, onFail);
  } else if (Platform.OS === 'android') {
    await requestAndroidPermission(GetForcefully, onSuccess, onFail);
  } else {
    Alert.alert(
      'Unsupported Platform',
      'Location is not supported on this platform.',
      [
        {
          text: 'Back',
          onPress: () => onFail(),
        },
      ],
    );
  }
};

const requestIOSPermission = async (
  GetForcefully: boolean,
  onSuccess: (location: any) => void,
  onFail: any,
) => {
  console.log('Checking iOS location permissions...');

  const authStatus = await Geolocation.requestAuthorization('always'); // or "always"

  console.log('Authorization Status:', authStatus);

  if (authStatus === 'granted') {
    console.log('Permission granted, fetching location...');
    getCurrentLocation(onSuccess);
  } else {
    console.log('Permission denied, showing settings alert...');
    showSettingsAlert(onFail);
  }
};

const requestAndroidPermission = async (
  GetForcefully: boolean,
  onSuccess: (location: any) => void,
  onFail: any,
) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (GetForcefully) {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Started requesting');
        await promptForEnableLocationIfNeeded()
          .then(() => getCurrentLocation(onSuccess))
          .catch(() => showEnableLocationAlert(onFail));
      } else {
        showPermissionDeniedAlert(onFail);
      }
    } else {
      await promptForEnableLocationIfNeeded().then(() => {
        getCurrentLocation(onSuccess);
      });
    }
  } catch (error) {
    console.warn(error);
    showPermissionDeniedAlert(onFail);
  }
};

const getCurrentLocation = (onSuccess: (location: any) => void) => {
  Geolocation?.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      console.log('latitude, longitude', latitude, longitude);
      const location = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      onSuccess(location);
    },
    error => {
      console.warn(error);
    },
    {enableHighAccuracy: true, timeout: 60000},
  );
};

const showPermissionDeniedAlert = (onFail: any) => {
  Alert.alert(
    'Location Permission Required',
    'This feature requires location permissions.',
    [
      {text: 'cancel', onPress: () => onFail()},
      {
        text: 'Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
  );
};

const showEnableLocationAlert = (onFail: any) => {
  Alert.alert(
    'Enable Location Services',
    'Location services are turned off. Please enable them to proceed.',
    [
      {text: 'cancel', onPress: () => onFail()},
      {
        text: 'Enable',
        onPress: () => promptForEnableLocationIfNeeded(),
      },
    ],
  );
};

const showSettingsAlert = (onFail: any) => {
  Alert.alert(
    'Location Permission Required',
    'Please enable location permissions in your app settings to proceed.',
    [
      {
        text: 'Cancel',
        onPress: () => onFail(),
      },
      {
        text: 'Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
  );
};

export const locationEnabler = async (
  onSuccess?: (res: any) => void,
  onFail?: (err: any) => void,
) => {
  if (Platform.OS === 'android') {
    await promptForEnableLocationIfNeeded()
      .then((_res: any) => {
        if (onSuccess) {
          onSuccess(true);
        }
      })
      .catch(err => {
        if (onFail) {
          onFail(err);
        }
      });
  }
};

export const locationOffModal = () => {
  Alert.alert('Location Permission', 'Please turn on location services', [
    {
      text: 'Ok',
      onPress: () => {
        locationEnabler();
      },
    },
  ]);
};

export const _openAppSetting = () => {
  Alert.alert(
    'Location Permission',
    'Please allow app to access your location',
    [
      {
        text: 'Setting',
        onPress: () => Linking.openSettings(),
      },
      {
        text: 'cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
  );
};

export const getAddress = async (
  region: any,
  onSuccess?: any,
  onFailure?: any,
) => {
  const headersList = {};
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${region?.latitude},${region?.longitude}&key=${GOOGLE_MAP_API_KEY}`;
  fetch(url, {
    method: 'GET',
    headers: headersList,
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('responseJson--', responseJson);
      if (responseJson.status === 'OK') {
        return responseJson;
      } else {
        errorToast(responseJson?.status + ' ' + responseJson?.error_message);
      }
    })
    .then(async data => {
      onSuccess(data);
    })
    .catch(error => {
      console.log('error------', error);
      onFailure(error);
    });
};
