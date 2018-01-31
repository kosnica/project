<?php

namespace NoteBundle\Service;

use Doctrine\ORM\EntityManager;
use NoteBundle\Entity\Note;
use NoteBundle\Entity\NoteType;


class NoteService
{

    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @var array
     */
    private $arrFunctions = array('color' => 'setColor',
                                  'status' => 'setStatus');


    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     *
     * @return array $arrData Array of all notes
     */

    public function getAllNotes()
    {
        $arrNotes = $this->em->getRepository(Note::class)->findAll();
        $arrData = array();

        if (count($arrNotes) > 0)
        {
            foreach ($arrNotes as $objNote)
            {
                $arrRecord = $this->setOneRecord($objNote);
                if (count($arrRecord) > 0)
                {
                    $arrData[] = $arrRecord;
                }
            }
        }

        return $arrData;
    }

    /**
     * @param int $id Note id
     *
     * @return array $arrData Array of note properties
     */

    public function getOneNote($id)
    {
        $objNote = $this->em->getRepository(Note::class)->find($id);
        $arrData = array();

        if (is_object($objNote))
        {
            $arrData = $this->setOneRecord($objNote);
        }

        return $arrData;
    }

    /**
     * @param array $data Array of note properties
     *
     * @return array $arrData with new note properties
     */

    public function insertNote($data)
    {
        $intNoteId =  $this->setOneNote($data, new Note());
        $objNote = $this->em->getRepository(Note::class)->find($intNoteId);
        $arrData = $this->setOneRecord($objNote);
        return $arrData;
    }


    /**
     * @param int $id Note id
     * @param array $data Array of note properties
     *
     * @return boolean true or false depending on whether the object exists

     */

    public function updateNote($id, $data)
    {
        $objNote = $this->em->getRepository(Note::class)->find($id);

        if (is_object($objNote))
        {
            $intNoteId = $this->setOneNote($data, $objNote);
            $arrData = $this->setOneRecord($objNote);
            return $arrData;
        }

        return array();
    }

    /**
     * @param int $id Note id
     * @param string $value Attribute value
     * @param string $attribute Note entity attribute
     *
     * @return boolean true or false depending on whether the object exists
     */

    public function updateOneItem($id, $value, $attribute)
    {
        $objNote = $this->em->getRepository(Note::class)->find($id);

        if (is_object($objNote))
        {
            $strFunction = $this->arrFunctions[$attribute];
            $objNote->$strFunction($value);
            $this->em->persist($objNote);
            $this->em->flush();

            return true;
        }

        return false;
    }

    /**
     *
     * @return array $arrIndexes Array of ids from removed records
     */

    public function removeAll()
    {
        $notes = $this->em->getRepository(Note::class)->findByStatus('deleted');
        $arrIndexes = array();

        if (count($notes) > 0)
        {
            foreach ($notes as $objNote)
            {
                $objNote->setStatus('removed');
                $arrIndexes[] = $objNote->getId();
                $this->em->persist($objNote);
            }

            $this->em->flush();
        }

        return $arrIndexes;
    }

    /**
     *
     * @return array $arrData Array of notes types
     */

    public function getAllTypes()
    {
        $noteType = $this->em->getRepository(NoteType::class)->findAll();
        $arrData = array();

        if (count($noteType) > 0)
        {
            foreach ($noteType as $objType)
            {
                if (is_object($objType))
                {
                    $strType = $objType->getAlias();
                    $arrData[$strType] = array('alias' => $strType,
                                                'name'  => $objType->getName());
                }
            }
        }

        return $arrData;
    }

    /**
     * @param object $objNote
     *
     * @return array $arrData Array of note properties
     */

    private function setOneRecord($objNote)
    {
        if (is_object($objNote))
        {
            $arrData = array('id'      => $objNote->getId(),
                             'title'   => $objNote->getTitle(),
                             'note'    => $objNote->getDescription(),
                             'type'    => $objNote->getNoteType()->getAlias(),
                             'color'   => $objNote->getColor(),
                             'status'  => $objNote->getStatus());

            return $arrData;
        }

        return array();
    }

    /**
     * @param object $note
     * @param array $data Array of note properties
     *
     */
    private function setOneNote($data, $note)
    {
        $noteType = $this->em->getRepository(NoteType::class)->findOneByAlias($data['type']);
        $note->setTitle($data['title']);
        $note->setDescription($data['note']);
        $note->setNoteType($noteType);
        $this->em->persist($note);
        $this->em->flush();

        return $note->getId();
    }
}