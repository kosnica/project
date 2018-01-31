<?php

namespace NoteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use NoteBundle\Validation\RequestValidation;

class NoteController extends Controller
{
    /**
     *
     * @return array $arrData Array of all notes
     */

    public function indexAction()
    {
        $noteService = $this->container->get('note_service');
        $arrData = $noteService->getAllNotes();

        return $arrData;
    }

    /**
     * @param int $id Note id
     *
     * @return array $arrData Array of note properties
     */

    public function getAction($id)
    {
        $noteService = $this->container->get('note_service');
        $arrData = $noteService->getOneNote($id);

        return $arrData;
    }

    /**
     * @param Request $request
     *
     * @return array $arrData Array of note properties
     */

    public function saveAction(Request $request)
    {
        $requestData = $request->request->all();
        $validateData = new RequestValidation($requestData);
        $data = $validateData->options;

        $noteService = $this->container->get('note_service');
        $arrNote = $noteService->insertNote($data);

        $arrData = array('data'=> $arrNote);

        return $arrData;
    }


    /**
     * @param int $id Note id
     * @param Request $request
     *
     * @return array $arrResult Array of note properties
     */

    public function updateAction(Request $request, $id)
    {
        $requestData = $request->request->all();
        $validateData = new RequestValidation($requestData);
        $data = $validateData->options;

        $noteService = $this->container->get('note_service');
        $arrResult = $noteService->updateNote($id, $data);

        $arrResult = array('data' => $arrResult);

        return $arrResult;
    }

    /**
     * @param int $id Note id
     * @param Request $request
     *
     * @return array $arrResult with success flag
     */

    public function updateColorAction(Request $request, $id)
    {
        $requestData = $request->request->all();
        $validateData = new RequestValidation($requestData);
        $data = $validateData->options;

        $noteService = $this->container->get('note_service');
        $boolResult = $noteService->updateOneItem($id, $data['color'], 'color');
        $arrResult = array('success' => $boolResult);

        return $arrResult;
    }

    /**
     * @param int $id Note id
     * @param Request $request
     *
     * @return array $arrResult with success flag
     */

    public function updateStatusAction(Request $request, $id)
    {
        $requestData = $request->request->all();
        $validateData = new RequestValidation($requestData);
        $data = $validateData->options;

        $noteService = $this->container->get('note_service');
        $boolResult = $noteService->updateOneItem($id, $data['status'], 'status');
        $arrResult = array('success' => $boolResult);

        return $arrResult;
    }

    /**
     *
     * @return array $arrIndexes Array of ids from removed records
     */

    public function removeAllAction()
    {
        $noteService = $this->container->get('note_service');
        $arrResult = $noteService->removeAll();

        return $arrResult;
    }

    /**
     * @param int $id Note id
     *
     * @return array $arrResult with success flag
     */

    public function removeAction($id)
    {
        $noteService = $this->container->get('note_service');
        $boolResult = $noteService->updateOneItem($id, 'removed', 'status');
        $arrResult = array('success' => $boolResult);

        return $arrResult;
    }

    /**
     *
     * @return array $arrData Array of notes types
     */

    public function getTypesAction()
    {
        $noteService = $this->container->get('note_service');
        $arrResult = $noteService->getAllTypes();

        return $arrResult;
    }
}
