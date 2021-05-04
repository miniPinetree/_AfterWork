/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';

function InfinityScroll(props) {
  const { children, callNext, is_next, loading } = props;

  // throttle 300ms 지정
  const _handleScroll = _.throttle(() => {
    // 로딩중일때는 리턴
    if (loading) {
      return;
    }
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      // 영역이 200남으면 호출
      callNext();
    }
  }, 300);

  const handleScroll = useCallback(_handleScroll, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (is_next) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [is_next, loading]);

  return <>{children}</>;
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
