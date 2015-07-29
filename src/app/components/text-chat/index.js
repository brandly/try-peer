import './index.css'
import React from 'react'
import { addons } from 'react/addons'
import classNames from 'classnames'
import ConversationStore from '../../stores/conversation-store'
import PeerStore from '../../stores/peer-store'
import TextHistory from '../text-history'
import ComposeText from '../compose-text'
import CallButton from '../call-button'

export default class TextChat extends React.Component {
  mixins: [addons.PureRenderMixin]

  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState() {
    return {
      texts: ConversationStore.getTexts(),
      peerId: PeerStore.getId()
    }
  }

  componentWillMount() {
    [ConversationStore, PeerStore].forEach(store => {
      store.addChangeListener(() => {
        this.setState(this.getState())
      })
    })
  }

  render() {
    const { texts, peerId } = this.state
    const { isVideoChatting, hasCall, isCallingFriend, isReceivingCall } = this.props

    const showCallButton = !hasCall || isCallingFriend
    const callButtonProps = { hasCall, isCallingFriend }

    const footerClasses = classNames({
      'absolute-footer': true,
      'show-call-button': showCallButton
    })

    return (
      <div className="text-chat">
        <div className="above-footer">
          <TextHistory texts={texts} peerId={peerId} />
        </div>
        <div className={footerClasses}>
          <ComposeText />
          {showCallButton ? (<CallButton {...callButtonProps} />) : null}
        </div>
      </div>
    )
  }
}
