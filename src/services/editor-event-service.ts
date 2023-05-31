/**
 * 에디터의 `message` 이벤트에 대한 리스너를 반환합니다.
 * 메시지의 타입에 따라 `handlers` 인자로 전달된 핸들러 함수를 실행합니다.
 */
export function handleEditorMessageEvent(
  editorElement: HTMLIFrameElement,
  handlers: {
    [messageType: string]: EditorMessageHandler;
  },
): EditorMessageEventListener {
  function eventListener(e: MessageEvent<EditorMessage>) {
    // 지정된 iframe에 대해서만 이벤트 처리
    if (e.source !== editorElement.contentWindow) {
      return;
    }

    const { type, payload } = e.data;

    const handler = handlers[type];
    if (!handler) {
      throw new Error(`메시지 타입 '${type}'을 처리하는 핸들러가 존재하지 않습니다.`);
    }

    handler(payload);
  }

  return eventListener;
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
