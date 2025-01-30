export interface EventDate {
  year: string;
  month: string;
  hour: string;
  minute: string;
  day: string;
}

export interface TLEvent {
  text: {
    headline: string;
    text: string;
  };
  start_date: EventDate;
  group: string;
  evclass: string;
  unique_id: string;
  end_date: EventDate;
  media: {
    url: string;
    caption: string;
    credit: string;
  };
}

export interface WPPage {
  ID: number;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  filter: string;
}

export interface PageContent {
  title: string;
  content: string;
  slug: string;
  image: string;
  image_full: string;
  order: number;
  fields: {
    [key: string]: string | string[];
  };
}
