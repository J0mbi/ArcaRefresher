import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Portal,
} from '@material-ui/core';
import { ImageSearch } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { useElementQuery } from 'core/hooks';
import {
  ARTICLE_IMAGES,
  ARTICLE_LOADED,
  ARTICLE_VIEW,
  BOARD_ARTICLES,
  BOARD_LOADED,
  BOARD_VIEW,
  COMMENT_LOADED,
  COMMENT_VIEW,
} from 'core/selector';
import {
  addAREvent,
  removeAREvent,
  EVENT_AUTOREFRESH,
  EVENT_COMMENT_REFRESH,
} from 'core/event';

import { MODULE_ID } from './ModuleInfo';
import CommentButton from './CommentButton';

const useStyles = makeStyles(() => ({
  deletedArticle: {
    '& .article-body': {
      '& img, video': {
        display: 'none',
      },
    },
  },
  comment: {
    '& #comment:not(.temp-show)': {
      display: 'none',
    },
    '& #comment.temp-show + .unfold-button-container': {
      display: 'none',
    },
  },
}));

const WAITING = 'WAITING';
const CONFIRM = 'CONFIRM';
const IGNORE = 'IGNORE';

// TODO: 설정값 반영
export default function ExperienceCustomizer() {
  const {
    config: {
      openArticleNewWindow,
      hideFirstImage,
      blockMediaNewWindow,
      blockDeletedArticleMedia,
      ratedownGuard,
      foldComment,
      wideClickArea,
    },
    hideDeletedArticleMedia,
  } = useSelector((state) => state[MODULE_ID]);
  const articleLoaded = useElementQuery(ARTICLE_LOADED);
  const alertLoaded = useElementQuery('.board-title + .alert-danger');
  const commentLoaded = useElementQuery(COMMENT_LOADED);
  const boardLoaded = useElementQuery(BOARD_LOADED);
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState(null);
  const [unfoldContainer, setUnfoldContainer] = useState(null);
  const [hiddenFirstImage, setHiddenFirstImage] = useState(null);
  const [hiddenFirstImageContainer, setHiddenFirstImageContainer] =
    useState(null);
  const [confirm, setConfirm] = useState(WAITING);
  const classes = useStyles();

  useEffect(() => {
    if (articleLoaded) {
      setArticle(document.querySelector(ARTICLE_VIEW));
      setHiddenFirstImageContainer(document.createElement('div'));
    }
  }, [articleLoaded]);

  useEffect(() => {
    if (!article || !blockMediaNewWindow) return;

    article.querySelectorAll(ARTICLE_IMAGES).forEach((i) => {
      const a = document.createElement('a');
      i.insertAdjacentElement('beforebegin', a);
      a.append(i);
    });
  }, [article, blockMediaNewWindow]);

  useEffect(() => {
    if (!article || !hideFirstImage) return undefined;

    const firstImage = article.querySelector(
      '.article-content > p:first-child img, .article-content > p:first-child video:not([controls])',
    )?.parentNode;
    if (!firstImage) return undefined;

    firstImage.style.display = 'none';

    setHiddenFirstImage(firstImage);
    firstImage.insertAdjacentElement('afterend', hiddenFirstImageContainer);

    return () => {
      firstImage.style.display = '';
      setHiddenFirstImage(null);
      hiddenFirstImageContainer.remove();
    };
  }, [article, hiddenFirstImageContainer, hideFirstImage]);

  useEffect(() => {
    if (!article || !blockDeletedArticleMedia) return undefined;
    if (!alertLoaded) return undefined;

    if (blockDeletedArticleMedia && hideDeletedArticleMedia) {
      article.classList.add(classes.deletedArticle);
    }

    return () => article.classList.remove(classes.deletedArticle);
  }, [
    article,
    alertLoaded,
    blockDeletedArticleMedia,
    hideDeletedArticleMedia,
    classes,
  ]);

  const handleUnhide = useCallback(() => {
    if (hiddenFirstImage) {
      hiddenFirstImage.style.display = '';
      setHiddenFirstImage(null);
    }
  }, [hiddenFirstImage]);

  useEffect(() => {
    if (!article || !ratedownGuard) return null;

    const ratedownButton = article.querySelector('#rateDown');
    if (!ratedownButton) return null;

    const ratedownClick = (e) => {
      setConfirm((prev) => {
        if (prev === WAITING) {
          e.preventDefault();
          return CONFIRM;
        }
        return WAITING;
      });
    };

    ratedownButton.addEventListener('click', ratedownClick);
    return () => ratedownButton.removeEventListener('click', ratedownClick);
  }, [article, ratedownGuard]);

  useEffect(() => {
    if (!commentLoaded) return;

    setComment(document.querySelector(COMMENT_VIEW));
    addAREvent(EVENT_COMMENT_REFRESH, () => {
      setComment(document.querySelector(COMMENT_VIEW));
    });
  }, [commentLoaded]);

  useEffect(() => {
    if (!boardLoaded || !openArticleNewWindow) return null;

    const board = document.querySelector(BOARD_VIEW);
    const applyNewWindow = () => {
      const articles = board.querySelectorAll(BOARD_ARTICLES);
      articles.forEach((a) => {
        a.setAttribute('target', '_blank');
      });
    };

    applyNewWindow();
    addAREvent(EVENT_AUTOREFRESH, applyNewWindow);
    return () => {
      const articles = board.querySelectorAll(BOARD_ARTICLES);
      articles.forEach((a) => {
        a.setAttribute('target', '');
      });

      removeAREvent(EVENT_AUTOREFRESH, applyNewWindow);
    };
  }, [boardLoaded, openArticleNewWindow]);

  useEffect(() => {
    if (!comment || !foldComment) return null;

    if (!unfoldContainer) {
      const container = document.createElement('div');
      container.classList.add('unfold-button-container');
      comment.insertAdjacentElement('afterend', container);
      setUnfoldContainer(container);
      return null;
    }

    document.documentElement.classList.add(classes.comment);
    return () => document.documentElement.classList.remove(classes.comment);
  }, [classes, comment, foldComment, unfoldContainer]);

  useEffect(() => {
    if (!comment || !wideClickArea) return null;

    const handleClick = (e) => {
      if (e.target.closest('form')) return;

      const target = e.target.closest('a, .emoticon, .btn-more, .message');
      if (!target?.classList.contains('message')) return;

      e.preventDefault();

      target.parentNode.querySelector('.reply-link').click();
    };

    comment.addEventListener('click', handleClick);
    return () => comment.removeEventListener('click', handleClick);
  }, [comment, wideClickArea]);

  const handleConfirm = useCallback(() => {
    setConfirm(IGNORE);

    article.querySelector('#rateDown').click();
  }, [article]);

  const handleClose = useCallback(() => {
    setConfirm(WAITING);
  }, []);

  return (
    <>
      <Dialog open={confirm === CONFIRM} onClose={handleClose}>
        <DialogTitle>비추천 재확인</DialogTitle>
        <DialogContent>
          비추천을 누르셨습니다. 진짜 비추천하시겠습니까?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>예</Button>
          <Button onClick={handleClose}>아니오</Button>
        </DialogActions>
      </Dialog>
      {hiddenFirstImage && (
        <Portal conatiner={hiddenFirstImageContainer}>
          <Tooltip title="첫 이미지 보이기">
            <IconButton size="small" onClick={handleUnhide}>
              <ImageSearch />
            </IconButton>
          </Tooltip>
        </Portal>
      )}
      {unfoldContainer && foldComment && (
        <Portal container={unfoldContainer}>
          <CommentButton className="unfold-comment" />
        </Portal>
      )}
    </>
  );
}
