import React, { useState} from 'react';
import { withTaskContext } from '@twilio/flex-ui';
import { Button, TextField, } from '@material-ui/core'
import crypto from 'crypto';

const SmsPanel = (props) => {
  if (!props.task) return null;

  const [message, setMessage] = useState('');

  // 送信ボタンが押されたときのイベントハンドラ
  const onClick = () => {
    console.log(`🐞 Clicked. ${message}`);
    const to = props.task.attributes.from;
    const functionUrl = process.env.FLEX_APP_FUNCTION_URL;
    let url = functionUrl;
    const authToken = process.env.FLEX_APP_AUTH_TOKEN;
    const body = {
      body: message,
      to,
    };
    // X-Twilio-Signatureの生成
    Object.keys(body).sort().forEach((key) => {
      url = url + key + body[key];
    });
    const signature = crypto.createHmac('sha1', authToken)
      .update(Buffer.from(url, 'utf-8'))
      .digest('base64');
    console.log(`🐞 signature: ${signature}`);
    const options = {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: {
        'Context-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'X-Twilio-Signature': signature,
      },
    };

    // Functionの呼び出し
    fetch(functionUrl, options)
      .then(resp => resp.json())
      .then(data => console.log(`🐞 ${JSON.stringify(data, null, '\t')}`));

    // メッセージ欄をクリア
    setMessage('');
  }

  return (
    <div>
      <TextField
        id='message'
        label='MessageBody'
        style={{ margin: 8 }}
        helperText='Please input text message.'
        fullWidth
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={onClick}>
        Send
      </Button>
    </div>
  );
};

export default withTaskContext(SmsPanel);