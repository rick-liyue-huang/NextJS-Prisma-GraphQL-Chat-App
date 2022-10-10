import { Session } from 'next-auth';
import React from 'react';

interface Props {
  session: Session;
}

export const FeedWrap: React.FC<Props> = ({ session }) => {
  return <div>FeedWrap</div>;
};
