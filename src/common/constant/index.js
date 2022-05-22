import SvgComponent from '@assets/svg';
import colors from '@assets/colors';
import i18next from 'i18next';
import { moderateScale, scale, verticalScale } from '@common/scale';

export const BANNER_ID = 'ca-app-pub-6427128121515673/9376060208';
export const INTERSTITIAL_ID = 'ca-app-pub-6427128121515673/8027072092';
export const REWARD_ID = 'ca-app-pub-6427128121515673/8027072092';

export const LIMIT_PLAYLIST = 8;
export const LIMIT_USER = 30;
export const LIMIT_ROOM = 10;
export const LIMIT_SONG = 30;
export const LIMIT_SONGS_IN_YOUTUBE = 30;
export const RANK_POSITION = [0, 1, 2];

export const CHANNEL_ID_NOTIFICATION = 'CHANNEL_ID_ROCKWARS';
export const CHANNEL_NAME_NOTIFICATION = 'CHANNEL_ROCKWARS';

export const TYPE_PLAYLIST_ID = {
  MOST_FAVOURITE_SONGS: 'MOST_FAVOURITE_SONGS',
  TOP_SONGS_OF_THE_MONTH: 'TOP_SONGS_OF_THE_MONTH',
  TOP_SONGS_OF_THE_WEEK: 'TOP_SONGS_OF_THE_MONTH',
  TRENDING_SONGS: 'TRENDING_SONGS',
  RECENTLY_PLAYED: 'RECENTLY_PLAYED',
};

export const TYPE_LIST_SONG = {
  SONGS_IN_PLAYLIST: 'SONGS_IN_PLAYLIST',
  SONG_PLAYING_NOW: 'SONG_PLAYING_NOW',
  MOST_FAVOURITE_SONGS: 'MOST_FAVOURITE_SONGS',
  TOP_SONGS_OF_THE_MONTH: 'TOP_SONGS_OF_THE_MONTH',
  TOP_SONGS_OF_THE_WEEK: 'TOP_SONGS_OF_THE_MONTH',
  TRENDING_SONGS: 'TRENDING_SONGS',
};

export const TYPE_NOTIFICATION = {
  FRIEND: 'FRIEND',
  FOLLOWING_INFO: 'FOLLOWING_INFO',
  INVITED: 'INVITED',
  LIKE_POST : 'LIKE_POST',
  COMMENT_POST : 'COMMENT_POST'
};

export const MAP_INDEX_TO_ICON = {
  0: SvgComponent.rank1,
  1: SvgComponent.rank2,
  2: SvgComponent.rank3,
};

export const MAP_SCREEN_TYPE_TO_ICON = {
  FAVOURITE: SvgComponent.loveRed,
  MONTH: SvgComponent.star,
  WEEK: SvgComponent.star,
  TRENDING: SvgComponent.headPhoneSmall,
  POPULAR: SvgComponent.popularUser,
  WINNER: SvgComponent.trophy,
  ACTIVE: SvgComponent.dj,
  LIKE: SvgComponent.like,
};

export const TARGET_MEMBER = [
  {
    title: i18next.t('room:txt_everyone'),
    description: i18next.t('room:txt_everyone_description'),
    value: 'PUBLIC',
  },
  {
    title: i18next.t('room:txt_invite_only'),
    description: i18next.t('room:txt_invite_only_description'),
    value: 'PRIVATE',
  },
];

export const RULE_OF_ROOM = [
  {
    title: i18next.t('room:txt_majority'),
    description: i18next.t('room:txt_majority_description'),
    value: 'MAJORITY',
  },
  {
    title: i18next.t('room:txt_all_users'),
    description: i18next.t('room:txt_all_users_description'),
    value: 'ALL',
  },
];

export const MAP_TYPE_AND_RULE = {
  PUBLIC: i18next.t('room:txt_everyone'),
  PRIVATE: i18next.t('room:txt_invite_only'),
  MAJORITY: i18next.t('room:txt_majority'),
  ALL: i18next.t('room:txt_all_users'),
};

export const MESSAGES_TYPE = {
  left_room: 'left room',
  joined_room: 'joined room',
};

export const ROOM_MODE = {
  TOUR: 'TOURNAMENT',
  NORMAL: 'NORMAL',
};

export const VOTE_TYPE = {
  UP: 'UP',
  DONW: 'DOWN',
};

export const TYPE_PRIEND_STATUS = {
  pending: 'PENDING',
  friend: 'FRIEND',
  followed: 'FOLLOWED',
  follower: 'FOLLOWER',
};

export const ICON_TYPE = {
  FAVOURITE: 'FAVOURITE',
  MONTH: 'MONTH',
  WEEK: 'WEEK',
  TRENDING: 'TRENDING',
  WINNER: 'WINNER',
  POPULAR: 'POPULAR',
  ACTIVE: 'ACTIVE',
  LIKE: 'LIKE',
};

export const USER_TYPE = {
  POPULAR: 'POPULAR',
  WINNER_OF_WEEK: 'WINNER_OF_WEEK',
  WINNER: 'WINNER',
};

export const TYPE_PLAYLIST = {
  USER_PLAYLIST: 'USER_PLAYLIST',
  TOUR_PLAYLIST: 'TOUR_PLAYLIST',
};

export const LIST_TAB = [
  {
    id: 3,
    title: 'room',
    image: SvgComponent.tabRoom,
    imageDisable: SvgComponent.tabRoomDisable,

    startColor: colors.startColorRoom,
    endColor: colors.endColorRoom,
  },
  {
    id: 1,
    title: 'users',
    image: SvgComponent.tabUsers,
    imageDisable: SvgComponent.tabUsersDisable,
    startColor: colors.startColorUser,
    endColor: colors.endColorUser,
  },
];

export const TAB_ROOMS = [
  { key: 'all', roomName: 'All Room' },
  { key: 'normal', roomName: 'Normal Room' },
  { key: 'tournament', roomName: 'Tournament Room' },
];

export const TAB_FRIEND = [
  { key: 'friends', name: i18next.t('friend') },
  { key: 'followers', name: i18next.t('followers') },
  { key: 'following', name: i18next.t('following') },
];

export const TAB_MUSIC_AND_ROOM = [
  { key: 'played', name: 'Recently Played' },
  { key: 'joined', name: 'Joined Room' },
];

export const statusFriend = {
  Friend: 'FRIEND',
  Followers: 'FOLLOWER',
  Following: 'FOLLOWED',
  Pending: 'PENDING',
};

export const styles = {
  thumbStyle: {
    backgroundColor: colors.endColorSong,
    width: scale(12),
    height: verticalScale(12),
  },
  image: {
    width: '100%',
    height: verticalScale(131),
    borderRadius: 10,
  },
  // imageBackground: {
  //   backgroundColor: 'transparent',
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  // },
  imageBackground: { borderRadius: 10, opacity: 0.5 },
  linearGradient: {
    height: verticalScale(50),
    width: scale(110),
    borderRadius: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: verticalScale(16),
    marginRight: scale(16),
    paddingLeft: scale(8),
  },
  tabView: {
    flexGrow: 0,
    marginBottom: 20,
  },
};
