import fontawesome from '@fortawesome/fontawesome';
import faCodeBranch from '@fortawesome/fontawesome-pro-light/faCodeBranch';
import faOpenFolder from '@fortawesome/fontawesome-pro-light/faFolderOpen';
import faCog from '@fortawesome/fontawesome-pro-light/faCog';
import faWhatsapp from '@fortawesome/fontawesome-free-brands/faWhatsapp';
import faFacebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faAddressBook from '@fortawesome/fontawesome-pro-light/faAddressBook';
import faTimes from '@fortawesome/fontawesome-pro-light/faTimes';
import faAddressCard from '@fortawesome/fontawesome-pro-light/faAddressCard';
import faHandPointRight from '@fortawesome/fontawesome-pro-light/faHandPointRight';
import faHeart from '@fortawesome/fontawesome-pro-light/faHeart';
import faHome from '@fortawesome/fontawesome-pro-light/faHome';
import faMars from '@fortawesome/fontawesome-pro-light/faMars';
import faSearch from '@fortawesome/fontawesome-pro-light/faSearch';
import faCopy from '@fortawesome/fontawesome-pro-light/faCopy';
import faFrown from '@fortawesome/fontawesome-pro-light/faFrown';
import faPlay from '@fortawesome/fontawesome-pro-solid/faPlay';
import faShare from '@fortawesome/fontawesome-pro-light/faShare';
import faShareAlt from '@fortawesome/fontawesome-pro-light/faShareAlt';
import faSignInAlt from '@fortawesome/fontawesome-pro-light/faSignInAlt';
import faThumbsDown from '@fortawesome/fontawesome-pro-light/faThumbsDown';
import faThumbsUp from '@fortawesome/fontawesome-pro-light/faThumbsUp';
import faSpinner from '@fortawesome/fontawesome-pro-light/faSpinner';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

fontawesome.library.add(
  faPlay,
  faOpenFolder,
  faCodeBranch,
  faCopy,
  faCog,
  faFrown,
  faWhatsapp,
  faFacebook,
  faTimes,
  faBars,
  faSpinner,
  faAddressBook,
  faAddressCard,
  faHandPointRight,
  faHeart,
  faHome,
  faMars,
  faSearch,
  faShare,
  faShareAlt,
  faSignInAlt,
  faThumbsDown,
  faThumbsUp,
);
