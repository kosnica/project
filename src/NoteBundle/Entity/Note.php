<?php

namespace NoteBundle\Entity;

/**
 * Note
 */

class Note implements \JsonSerializable
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var int
     */
    private $type_id;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $note;

    /**
     * @var string
     */
    private $color = 'white';

    /**
     * @var string
     */
    private $status = 'regular';
    
     /**
     * @var object
     */
    private $note_type;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }


    /**
     * Set type_id
     *
     * @param integer $typeId
     * @return Note
     */
    public function setTypeId($typeId)
    {
        $this->type_id = $typeId;

        return $this;
    }

    /**
     * Get type_id
     *
     * @return integer
     */
    public function getTypeId()
    {
        return $this->type_id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Note
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return Note
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @return string 
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set color
     *
     * @param string $color
     * @return Note
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Get color
     *
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set status
     *
     * @param string $status
     * @return Note
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set note_type
     *
     * @param object $noteType
     * @return NoteType
     */
    public function setNoteType($noteType)
    {
        $this->note_type = $noteType;

        return $this;
    }

    /**
     * Get note_type
     *
     * @return NoteType
     */
    public function getNoteType()
    {
        return $this->note_type;
    }

    /**
     * Checking if note format is valid.
     *
     * @return boolean
     */

    public function isValidFormat()
    {
        $notType = $this->getNoteType()->getAlias();

        if ($notType == 'images')
        {
            $pattern = '/(https?:\/\/.*\.(?:png|jpg|jpeg))/';

            if (!preg_match($pattern, $this->getNote()))
            {
                return false;
            }
        }
        elseif ($notType == 'link')
        {
           if (!filter_var($this->getNote(), FILTER_VALIDATE_URL))
           {
               return false;
           }
        }

        return true;
    }

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        return [
                'id'      => $this->getId(),
                'title'   => $this->getTitle(),
                'note'    => $this->getNote(),
                'type'    => $this->getNoteType()->getAlias(),
                'color'   => $this->getColor(),
                'status'  => $this->getStatus()
        ];
    }
}
