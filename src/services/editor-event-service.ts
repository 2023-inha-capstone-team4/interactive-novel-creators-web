/**
 * 메시지 이벤트를 주고 받는 기능을 제공합니다.
 * 메시지는 `{ type: string, payload: any }` 형식으로 주고 받을 수 있도록 합니다.
 */

/**
 * 메시지 이벤트를 전송합니다.
 */
export function sendMessage(target: HTMLIFrameElement, message: EditorMessage) {
  target.contentWindow!.postMessage(message, '*');
}

/**
 * 주어진 핸들러 집합으로 메시지 이벤트를 처리하는
 * 이벤트 리스너 함수를 반환합니다.
 *
 * @param handlers 메시지 타입과 핸들러 함수의 맵(object)
 */
export function listenMessage(
  target: HTMLIFrameElement,
  handlers: {
    [messageType: string]: EditorMessageHandler;
  },
): EditorMessageEventListener {
  const listener: EditorMessageEventListener = (event: MessageEvent<EditorMessage>) => {
    if (event.source !== target.contentWindow) {
      return;
    }

    const { type, payload } = event.data;

    const handler = handlers[type];
    if (!handler) {
      throw new Error(`메시지 타입 '${type}'을 처리하는 핸들러가 존재하지 않습니다.`);
    }

    handler(payload);
  };

  return listener;
}

/**
 * 에디터에서 전송하는 메시지 데이터의 형식을 나타내는 인터페이스입니다.
 */
interface EditorMessage {
  type: string;
  payload: any;
}

/**
 * 에디터의 `message` 이벤트 리스너 함수의 인터페이스입니다.
 */
interface EditorMessageEventListener {
  (e: MessageEvent<EditorMessage>): void;
}

/**
 * 에디터에서 전송한 메시지를 처리하는 핸들러 함수 인터페이스입니다.
 */
interface EditorMessageHandler {
  (messagePayload: any): void;
}
