<?php


namespace NoteBundle\EventListener;

use \Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use \Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class NoteListener
{
    public function onKernelView(GetResponseForControllerResultEvent $event)
    {
        $controllerResult = $event->getControllerResult();
        $response = new JsonResponse();
        $response->setData($controllerResult);
        $event->setResponse($response);
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();
        $content = $request->getContent();

        if (empty($content))
        {
            return;
        }

        if ($request->getContentType() != 'json')
        {
            throw new BadRequestHttpException;
        }

        $data = json_decode($content, true);
        $request->request->replace($data);
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $exception = $event->getException();
        $data = array('error' => array( 'code' => $exception->getCode(),
                                        'message' => $exception->getMessage()));
        $response = new JsonResponse($data);
        $event->setResponse($response);
    }
}