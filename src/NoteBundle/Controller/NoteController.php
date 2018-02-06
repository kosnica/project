<?php

namespace NoteBundle\Controller;

use NoteBundle\Form\NoteType;
use NoteBundle\Entity\Note;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Exception\ValidatorException;

class NoteController extends Controller
{
    /**
     *
     * @return array $arrData Array of all notes
     */

    public function indexAction()
    {
        return $this->container->get('note_service')->getAllNotes();
    }

    /**
     * @param Note $note
     *
     * @return array $arrData Array of note properties
     *
     * @ParamConverter("note", class="NoteBundle:Note")
     */

    public function getAction(Note $note)
    {
        return $note;
    }

    /**
     * @param Request $request
     *
     * @throws ValidatorException
     *
     * @return array $arrData Array of note properties
     */

    public function saveAction(Request $request)
    {
        $requestData = $request->request->all();
        $noteService = $this->container->get('note_service');
        $requestData['note_type'] = $noteService->setNoteType($requestData['type']);

        $form = $this->createForm(NoteType::class);
        $form->submit($requestData);

        if ($form->isValid())
        {
            $noteService->flushNote($form->getData());
            return $form->getData();
        }

        throw new ValidatorException($form->getErrors(true));
    }

    /**
     * @param Request $request
     * @param Note $note
     *
     * @return array $arrResult Array of note properties
     * @throws ValidatorException
     *
     * @ParamConverter("note", class="NoteBundle:Note")
     */

    public function updateAction(Request $request, Note $note)
    {
        $requestData = $request->request->all();
        $noteService = $this->container->get('note_service');
        $requestData['note_type'] = $noteService->setNoteType($requestData['type']);

        $form = $this->createForm(NoteType::class, $note);
        $form->submit($requestData);

        if ($form->isValid())
        {
            $noteService->flushNote($form->getData());

            return $form->getData();
        }

        throw new ValidatorException($form->getErrors(true));
    }

    /**
     * @param Note $note
     * @param Request $request
     *
     * @return boolean
     *
     * @ParamConverter("note", class="NoteBundle:Note")
     */

    public function updateColorAction(Request $request, Note $note)
    {
        $requestData = $request->request->all();
        return $this->container->get('note_service')->updateOneItem($note, $requestData['color'], 'color');
    }

    /**
     * @param Note $note
     * @param Request $request
     *
     * @return array $arrResult with success flag
     *
     * @ParamConverter("note", class="NoteBundle:Note")
     */

    public function updateStatusAction(Request $request, Note $note)
    {
        $requestData = $request->request->all();

        return $this->container->get('note_service')->updateOneItem($note, $requestData['status'], 'status');
    }

    /**
     *
     * @return array $arrIndexes Array of ids from removed records
     */

    public function removeAllAction()
    {
        return $this->container->get('note_service')->removeAll();
    }

    /**
     * @param Note $note
     *
     * @return boolean
     *
     * @ParamConverter("note", class="NoteBundle:Note")
     */

    public function removeAction(Note $note)
    {
       return $this->container->get('note_service')->updateOneItem($note, 'removed', 'status');
    }

    /**
     *
     * @return array $arrData Array of notes types
     */

    public function getTypesAction()
    {
        return $this->container->get('note_service')->getAllTypes();
    }
}
