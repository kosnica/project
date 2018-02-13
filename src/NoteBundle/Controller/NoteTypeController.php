<?php

namespace NoteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class NoteTypeController extends Controller
{

    public function indexAction()
    {
        return $this->container->get('note_service')->getAllTypes();
    }
}